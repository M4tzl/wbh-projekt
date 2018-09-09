package com.github.dmn1k.tfm.mail;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Profile("prod")
@Service
public class AwsEmailService implements EmailService {
    private final AmazonSimpleEmailService simpleEmailService;

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
            .withSource("dominik.schlosser@gmail.com");

        simpleEmailService.sendEmail(request);
    }
}
