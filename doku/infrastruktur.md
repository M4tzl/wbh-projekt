# Infrastruktur

## Continuous Deployment

Die Anwendung wird bei jedem Commit auf master durch einen [Jenkins CI-Server](http://ec2-18-184-46-8.eu-central-1.compute.amazonaws.com/) auf eine EC2-Instanz deployed.

Der gesamte Build- und Deploymentvorgang ist in einem Jenkinsfile codiert. Damit muss innerhalb des Jenkins eigentlich nie etwas konfiguriert werden.

## Amazon Web Services

Innerhalb von AWS ist ein ECS-Projekt eingerichtet (ElasticContainerService), d.h. es wird ein Dockerimage (beschrieben durch das eingecheckte Dockerfile) auf einer EC2-Instanz (ElasticComputeCloud)
deployed.

Es ist weiterhin eine AutoScalingGroup eingerichtet, die dafür sorgt, dass die EC2-Instanz (genau wie die, auf der der Jenkins läuft) Nachts zwischen 0 und 9 Uhr Morgens heruntergefahren wird,
um Kosten zu sparen.

## Datenbank

Die Datenbank ist eine PostgreSQL 10.3, welche auch auf AWS deployed ist (RDS): 
wbh-projekt-db.cafuod7eczzu.eu-central-1.rds.amazonaws.com:5432

Zur Administration kann beispielsweise [pgAdmin](https://www.pgadmin.org/) verwendet werden.

Das Datenbankschema wird bei jedem Applikationsstart über [Liquibase](https://www.liquibase.org/) aktualisiert.
