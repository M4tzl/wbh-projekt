--liquibase formatted sql

--changeset Dominik Schlosser:UserAndRoles stripComments:true runOnChange:false splitStatements:true Comment:Add Users and Roles logicalFilePath:com/github/dmn1k/wbhprojekt/db/changelog/changes/v0002.sql
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

INSERT INTO role (name) VALUES ('VERMITTLER');
INSERT INTO role (name) VALUES ('INTERESSENT');
