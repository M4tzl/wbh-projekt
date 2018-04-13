# WBH-Projekt-Repository

## URLs

**Prod-URL**: http://wbh-projekt-lb-1252076767.eu-central-1.elb.amazonaws.com/

**Jenkins (für Continuous Delivery auf AWS)**: http://ec2-18-184-30-180.eu-central-1.compute.amazonaws.com

## Build & Run

``` bash
./mvnw clean install spring-boot:run
```

Die Anwendung läuft dann lokal gegen die AWS-Datenbank (PostgreSQL) unter **http://localhost:8081**
