--liquibase formatted sql

--changeset Dominik Schlosser:InitialData stripComments:true runOnChange:false splitStatements:true Comment:Add initial data logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0002.sql
INSERT INTO role (name) VALUES ('VERMITTLER');
INSERT INTO role (name) VALUES ('INTERESSENT');
