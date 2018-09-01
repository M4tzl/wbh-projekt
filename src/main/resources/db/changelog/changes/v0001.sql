--liquibase formatted sql

--changeset Dominik Schlosser:InitialSchemaCreation stripComments:true runOnChange:false splitStatements:true Comment:Adding Initial Schema logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0001.sql
CREATE TABLE "inserat" (
  id bigserial NOT NULL,
  titel varchar(50) not null,
  beschreibung varchar(MAX) not null,
  primary key (id)
);

CREATE TABLE "story" (
    id bigserial NOT NULL,
    titel varchar(100) not null,
    beschreibung varchar(MAX) null,
    primary key (id)
);
