package com.github.dmn1k.tfm.security;

import lombok.*;

import javax.persistence.*;
import java.util.Collections;
import java.util.Set;

@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private boolean enabled;

    @Singular
    @ManyToMany
    @JoinTable(name = "account_role",
        joinColumns = @JoinColumn(name = "account_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public Set<Role> getRoles(){
        if(!enabled){
            return Collections.emptySet();
        }

        return roles;
    }
}
