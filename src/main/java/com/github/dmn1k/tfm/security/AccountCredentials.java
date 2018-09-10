package com.github.dmn1k.tfm.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AccountCredentials {
    private String username;
    private String password;
}
