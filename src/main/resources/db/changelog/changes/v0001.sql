--liquibase formatted sql

--changeset Dominik Schlosser:InitialSchemaCreation stripComments:true runOnChange:false splitStatements:true Comment:Adding Initial Schema logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0001.sql
CREATE TABLE "rasse" (
  id bigserial NOT NULL,
  bezeichnung varchar(MAX) not null,
  PRIMARY KEY (id)
);

CREATE TABLE "schulterhoehe" (
  id bigserial NOT NULL,
  wert varchar(MAX) not null,
  PRIMARY KEY (id)
);

CREATE TABLE "inserat" (
  id bigserial NOT NULL,
  created date not null,
  last_update date null,
  status varchar(255) not null,
  rufname varchar(255) not null,
  rasse_id bigserial not null,
  rassen_freitext varchar(max) null,
  geschlecht varchar(1) not null,
  geburtsdatum date not null,
  schulterhoehe_id bigserial not null,
  voraussichtliche_schulterhoehe_id bigserial not null,
  kastriert smallint not null,
  gechipt smallint not null,
  geimpft smallint not null,
  stubenrein smallint not null,
  leinenfuehrigkeit smallint not null,
  autofahren smallint not null,
  vertraeglichkeit_kinder smallint not null,
  vertraeglichkeit_katzen smallint not null,
  vertraeglichkeit_hunde smallint not null,
  zutraulich smallint not null,
  kurzbeschreibung varchar(max) null,
  zielgruppe_anfaenger smallint not null,
  zielgruppe_senioren smallint not null,
  zielgruppe_garten smallint not null,
  zielgruppe_erfahren smallint not null,
  zielgruppe_familien smallint not null,
  PRIMARY KEY (id),
  FOREIGN KEY (rasse_id) REFERENCES rasse(id),
  FOREIGN KEY (schulterhoehe_id) REFERENCES schulterhoehe(id),
  FOREIGN KEY (voraussichtliche_schulterhoehe_id) REFERENCES schulterhoehe(id)
);

CREATE TABLE "story" (
    id bigserial NOT NULL,
    titel varchar(100) not null,
    beschreibung varchar(MAX) null,
    primary key (id)
);

-- Daten fuer Wertelisten
INSERT INTO rasse (id, bezeichnung) VALUES (1, 'Bernhardiner');
INSERT INTO rasse (id, bezeichnung) VALUES (2, 'Dackel');

INSERT INTO schulterhoehe (id, wert) VALUES (1, '<20cm');
INSERT INTO schulterhoehe (id, wert) VALUES (2, '21-35cm');
INSERT INTO schulterhoehe (id, wert) VALUES (3, '51-75cm');
INSERT INTO schulterhoehe (id, wert) VALUES (4, '76-85cm');
INSERT INTO schulterhoehe (id, wert) VALUES (5, '86-100cm');
INSERT INTO schulterhoehe (id, wert) VALUES (6, '>100cm');
