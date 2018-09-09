package com.github.dmn1k.tfm.inserate;

import org.springframework.data.rest.core.config.Projection;

import javax.persistence.Transient;
import java.time.LocalDate;
import java.util.EnumSet;

@Projection(name = "inseratExcerpt", types = {Inserat.class})
public interface InseratExcerptProjection {
    Long getId();
    LocalDate getLastUpdate();
    String getRufname();
    InseratStatus getStatus();
    boolean isAktivierbar();
    boolean isDeaktivierbar();
    boolean isVermittelbar();
    boolean isLoeschbar();
}
