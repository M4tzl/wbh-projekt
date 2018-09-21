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
    public static final String VERMITTLER_NAME = "VERMITTLER";
    public static final String INTERESSENT_NAME = "INTERESSENT";
    public static final String ADMIN_NAME = "ADMIN";

    public static final Role VERMITTLER = new Role(null, VERMITTLER_NAME);
    public static final Role INTERESSENT = new Role(null, INTERESSENT_NAME);
    public static final Role ADMIN = new Role(null, ADMIN_NAME);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
