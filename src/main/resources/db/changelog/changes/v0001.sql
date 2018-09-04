--liquibase formatted sql

--changeset Dominik Schlosser:InitialSchemaCreation stripComments:true runOnChange:false splitStatements:true Comment:Adding Initial Schema logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0001.sql
CREATE TABLE "inserat" (
  id bigserial NOT NULL,
  created date not null,
  last_update date null,
  status varchar(255) not null,
  rufname varchar(255) not null,
  rasse varchar(255) not null,
  rassen_freitext varchar(200) null,
  geschlecht varchar(1) not null,
  geburtsdatum date not null,
  schulterhoehe varchar(50) not null,
  voraussichtliche_schulterhoehe varchar(50) not null,
  kastriert boolean not null,
  gechipt boolean not null,
  geimpft boolean not null,
  stubenrein boolean not null,
  leinenfuehrigkeit boolean not null,
  autofahren boolean not null,
  vertraeglichkeit_kinder boolean not null,
  vertraeglichkeit_katzen boolean not null,
  vertraeglichkeit_hunde boolean not null,
  zutraulich boolean not null,
  kurzbeschreibung varchar(500) null,
  zielgruppe_anfaenger boolean not null,
  zielgruppe_senioren boolean not null,
  zielgruppe_garten boolean not null,
  zielgruppe_erfahren boolean not null,
  zielgruppe_familien boolean not null,
  PRIMARY KEY (id)
);

CREATE TABLE "inserat_bild" (
  id bigserial NOT NULL,
  inserat_id bigserial NOT NULL,
  bild_url varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE "story" (
    id bigserial NOT NULL,
    titel varchar(100) not null,
    beschreibung varchar(500) null,
    primary key (id)
);
