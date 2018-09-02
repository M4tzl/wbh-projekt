--liquibase formatted sql

--changeset Dominik Schlosser:InitialSchemaCreation stripComments:true runOnChange:false splitStatements:true Comment:Adding Initial Schema logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0001.sql
CREATE TABLE "inserat" (
  id bigserial NOT NULL,
  created date not null,
  last_update date null,
  status varchar(255) not null,
  rufname varchar(255) not null,
  rasse varchar(255) not null,
  rassen_freitext varchar(max) null,
  geschlecht varchar(1) not null,
  geburtsdatum date not null,
  schulterhoehe varchar(50) not null,
  voraussichtliche_schulterhoehe varchar(50) not null,
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
  PRIMARY KEY (id)
);

CREATE TABLE "story" (
    id bigserial NOT NULL,
    titel varchar(100) not null,
    beschreibung varchar(MAX) null,
    primary key (id)
);
