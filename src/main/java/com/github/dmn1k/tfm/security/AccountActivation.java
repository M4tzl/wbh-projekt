package com.github.dmn1k.tfm.security;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@EqualsAndHashCode(of = {"id"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "account_activation")
public class AccountActivation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String token;
    private LocalDate valid;
}
