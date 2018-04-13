FROM openjdk:8-jdk-alpine
# curl curl 169.254.170.2$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI | jq im Container gibt Credentials zurueck
RUN apk add --no-cache curl && apk add --no-cache jq
VOLUME /tmp
ADD target/wbh-projekt.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
