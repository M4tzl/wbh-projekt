package com.github.dmn1k.tfm.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(of = {"name"})
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role")
public class Role {
    public static final Role VERMITTLER = new Role(null, "VERMITTLER");
    public static final Role INTERESSENT = new Role(null, "INTERESSENT");
    public static final Role ADMIN = new Role(null, "ADMIN");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
