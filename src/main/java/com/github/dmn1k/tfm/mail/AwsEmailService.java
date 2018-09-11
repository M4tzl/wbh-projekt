package com.github.dmn1k.tfm.mail;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("prod")
@Service
public class AwsEmailService implements EmailService {
    @Autowired
    private AmazonSimpleEmailService simpleEmailService;

    @Value("${mail.from.address}")
    private String fromAddress;

    @Override
    public void send(Email email) {
        SendEmailRequest request = new SendEmailRequest()
            .withDestination(
                new Destination().withToAddresses(email.getToAddress()))
            .withMessage(new Message()
                .withBody(new Body()
                    .withHtml(new Content()
                        .withCharset("UTF-8").withData(email.getContent())))
                .withSubject(new Content()
                    .withCharset("UTF-8").withData(email.getSubject())))
            .withSource(fromAddress);

        simpleEmailService.sendEmail(request);
    }
}
