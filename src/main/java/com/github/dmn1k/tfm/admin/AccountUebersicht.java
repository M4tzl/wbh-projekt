package com.github.dmn1k.tfm.admin;

import lombok.Builder;
import lombok.Value;

import java.util.Set;

@Builder
@Value
public class AccountUebersicht {
    private long id;
    private String username;
    private Set<String> roles;
    private long veroeffentlichungen;
}
