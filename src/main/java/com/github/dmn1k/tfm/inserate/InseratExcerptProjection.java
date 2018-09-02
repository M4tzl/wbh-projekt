package com.github.dmn1k.tfm.inserate;

import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "inseratExcerpt", types = {Inserat.class})
public interface InseratExcerptProjection {
    Long getId();
    LocalDate getCreated();
    LocalDate getLastUpdate();
    String getRufname();
    InseratStatus getStatus();
}
