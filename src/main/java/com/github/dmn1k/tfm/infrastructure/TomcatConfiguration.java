package com.github.dmn1k.tfm.infrastructure;

import com.github.dmn1k.tfm.files.FileService;
import lombok.Cleanup;
import lombok.SneakyThrows;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.Http11NioProtocol;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Configuration
public class TomcatConfiguration {
    @Value("${server.port.http}")
    private int serverPortHttp;

    @Value("${server.port}")
    private int serverPortHttps;

    @Value("${ssl.required}")
    private boolean sslRequired;

    @Autowired
    private FileService fileService;

    @SneakyThrows
    @Bean
    public ServletWebServerFactory servletContainer() {
        if (sslRequired) {
            TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
                @Override
                protected void postProcessContext(Context context) {
                    SecurityConstraint securityConstraint = new SecurityConstraint();
                    securityConstraint.setUserConstraint("CONFIDENTIAL");
                    SecurityCollection collection = new SecurityCollection();
                    collection.addPattern("/*");
                    securityConstraint.addCollection(collection);
                    context.addConstraint(securityConstraint);
                }
            };

            File privateKeyFile = readPrivateKeyFile();

            tomcat.addAdditionalTomcatConnectors(redirectConnector());
            tomcat.addConnectorCustomizers(con -> configureTomcatKeystore(con, privateKeyFile));
            return tomcat;
        }

        return new TomcatServletWebServerFactory();
    }

    private void configureTomcatKeystore(Connector con, File privateKeyFile) {
        Http11NioProtocol proto = (Http11NioProtocol) con.getProtocolHandler();
        proto.setSSLEnabled(true);
        con.setScheme("https");
        con.setSecure(true);
        proto.setKeystoreFile(privateKeyFile.getAbsolutePath());
        proto.setKeystorePass("tfm-keystore");
        proto.setKeystoreType("PKCS12");
        proto.setProperty("keystoreProvider", "SunJSSE");
        proto.setKeyAlias("tfm");
    }

    private File readPrivateKeyFile() throws IOException {
        ResponseEntity<byte[]> keyFile = fileService.download("tfm.p12");
        File tempFile = File.createTempFile("ssl-key", ".p12");
        @Cleanup FileOutputStream fos = new FileOutputStream(tempFile);
        fos.write(keyFile.getBody());

        return tempFile;
    }

    private Connector redirectConnector() {
        Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
        connector.setScheme("http");
        connector.setPort(serverPortHttp);
        connector.setSecure(false);
        connector.setRedirectPort(serverPortHttps);
        return connector;
    }
}
