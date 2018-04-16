--liquibase formatted sql

--changeset Dominik Schlosser:InitialSchemaCreation stripComments:true runOnChange:false splitStatements:true Comment:Adding Initial Schema logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0001.sql
CREATE TABLE "TODO_ITEM" (
  id bigserial NOT NULL,
  title varchar(50) not null,
  description varchar(512) not null,
  primary key (id)
);