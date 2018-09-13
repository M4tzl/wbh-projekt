# WBH-Projekt-Repository

## URLs

Jenkins: http://ec2-54-93-123-189.eu-central-1.compute.amazonaws.com:8080/

## Build & Run

``` bash
./mvnw clean install spring-boot:run -Pbackend,frontend
```

Die Anwendung läuft dann lokal gegen die AWS-Datenbank (PostgreSQL) unter **http://localhost:8081**

## Prod-URL

Jeder Push führt bei erfolgreichem Build zu einem Deployment auf https://tier-fair-mittlung.de
