# Projektstruktur

## Infrastruktur

 * src/main/java => Hier befindet sich der gesamte Sourcecode
 * src/test/java => Hier befindet sich Testcode. Dieser wird von Maven bei Builds ausgeführt, landet aber NICHT im erzeugten Artefakt (Jar)
 * src/main/resources => Hier landet alles (das Meiste), was kein Java-Code ist, aber im erzeugten Artefakt (Jar) landen soll
 * src/test/resources => Ressourcen die nur für Tests relevant sind (bspw. Test-spezifische Konfigurationsdateien) und nicht im erzeugten Artefakt landen
 
Dateien im Root erklärt:
 * pom.xml => Hier wird Maven konfiguriert (welche Dependencies hat unser Projekt, wie wird es gebaut, ...)
 * Dockerfile => Das Projekt wird auf AWS in einem Docker-Container ausgeführt, welcher in dieser Datei beschrieben ist
 * Jenkinsfile => Das Projekt wird über Jenkins gebaut und auf AWS deployed. Der gesamte Build-Pipeline-Code befindet sich in dieser Datei.
 * mvnw / mvnw.cmd => Maven-Wrapper Einstiegsfiles. Darüber wird das Projekt gebaut, wenn man Maven nicht lokal installiert hat
 * taskdef.json => Beschreibungsdatei für AWS ECS (ElasticContainerService)
 * .gitignore => Hier wird beschrieben, welche Dateien und Ordner git ignorieren soll (bspw. den target-Ordner und IDE-spezifische Projektdateien)
 
## Ressourcen

Unter src/main/resources befinden sich eine Menge wichtiger Dateien und Ordner:

 * logback.xml: Hier wird das Anwendungslogging konfiguriert 
 * application.properties / application-prod.properties: 
   Diverse Spring-spezifische Konfigurationsparameter, kann aber auch selbst definierte Properties beinhalten. application-{profile}.properties enthalten Profil-spezifische Einstellungen. 
   Bei uns gibt es nur das Prod-Profil, das Einstellungen für AWS beinhaltet (bspw. anderer Application-Port als lokal)
 * templates: Die HTML-Templates der Anwendung werden hier abgelegt. Es wird die Templateengine ["Thymeleaf"](https://www.thymeleaf.org/) verwendet, über die dynamische Inhalte in das HTML gerendered werden können
 * static/css: Applikationseigene CSS-Dateien können hier abgelegt werden.
 * db/changelog/changes: Hier liegen [Liquibase](https://www.liquibase.org/)-Changesets, über die das Datenbankschema verwaltet wird. 
   Liquibase beherrscht verschiedene Formate, wir verwenden der Einfachheit halber .sql-Dateien mit Metadaten in Inline-Kommentaren.
 
