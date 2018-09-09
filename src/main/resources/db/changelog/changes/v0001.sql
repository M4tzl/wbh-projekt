--liquibase formatted sql

--changeset Dominik Schlosser:InitialSchemaCreation stripComments:true runOnChange:false splitStatements:true Comment:Adding Initial Schema logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0001.sql
CREATE TABLE "user" (
  id bigserial NOT NULL,
  username varchar(255) not null,
  password varchar(255) not null,
  PRIMARY KEY (id),
  CONSTRAINT UC_Username UNIQUE (username)
);

CREATE TABLE "role" (
  id bigserial NOT NULL,
  name varchar(255) not null,
  PRIMARY KEY (id),
  CONSTRAINT UC_Rolename UNIQUE (name)
);

CREATE TABLE "user_role" (
  id bigserial NOT NULL,
  user_id bigserial not null,
  role_id bigserial not null,
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(role_id) REFERENCES role(id),
  CONSTRAINT UC_User_Role UNIQUE (user_id, role_id)
);

CREATE TABLE "inserat" (
  id bigserial NOT NULL,
  vermittler_id bigserial NOT NULL,
  storyschreiber varchar(255) null,
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
  PRIMARY KEY (id),
  FOREIGN KEY (vermittler_id) REFERENCES user(id)
);

CREATE TABLE "inserat_bild" (
  id bigserial NOT NULL,
  inserat_id bigserial NOT NULL,
  bild_key varchar(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(inserat_id) REFERENCES inserat(id)
);

CREATE TABLE "story" (
    id bigserial NOT NULL,
    titel varchar(100) not null,
    beschreibung varchar(500) null,
    primary key (id)
);

CREATE TABLE "story_bild" (
  id bigserial NOT NULL,
  story_id bigserial NOT NULL,
  bild_key varchar(200) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(story_id) REFERENCES story(id)
);
