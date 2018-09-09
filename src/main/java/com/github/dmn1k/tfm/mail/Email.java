package com.github.dmn1k.tfm.mail;

import lombok.Builder;
import lombok.ToString;
import lombok.Value;

@ToString
@Builder
@Value
public class Email {
    private String toAddress;
    private String fromAddress;
    private String subject;
    private String content;
}
