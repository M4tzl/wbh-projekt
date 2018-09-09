package com.github.dmn1k.tfm.security;

import lombok.Data;

@Data
public class VermittlerRegistrationData {
    private String username;
    private String password;
    private Vermittler vermittler;
}
