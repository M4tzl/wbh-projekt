# Eingesetzte Werkzeuge

## JDK
Es muss ein 64bit JDK mindestens in Version 8 installiert sein:
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

## git
git ist ein Versionsverwaltungssystem. 

Download/Installation: https://git-scm.com/

Wichtige Befehle:
 * git clone \<Projekt-URL\>: Erzeugt eine lokale Kopie des Repositories
 * git add \<Dateiname\>: Fügt Datei zum Index hinzu 
 * git commit -m 'Commitmessage': Committed alle Dateien im Index
 * git push: Pushed lokale Änderungen (Commits) zum Remote-Repository, von dem gecloned wurde
 * git pull: Holt Änderungen vom Remote-Repository ab
 * git checkout \<branchname\>: Wechselt zu Branch
 * git checkout -b \<branchname\>: Legt Branch an und wechselt dort hin
 * git push -u origin \<branchname\>: Pushed neuen Branch (remote noch nicht bekannt)
 * git merge \<branchname\>: Merged \<branchname\> in aktuellen Branch
 * git mergetool: Öffnet konfiguriertes Mergetool (bspw. p4merge) um Mergekonflikte zu beheben

Dokus und Tutorials:
 * https://git-scm.com/doc
 * https://try.github.io/levels/1/challenges/1 => Gut gemachtes, interaktives Tutorial im Browser
 * https://www.atlassian.com/git => Inklusive weiterführender Konzepte wie Git-Workflows im Team
 
**Insbesondere beim ersten Einrichten beachten**: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup

## Maven
Maven ist sowohl Dependency Management-System als auch Buildtool. Die Konfiguration für ein Maven-Projekt befindet sich immer in eine Datei "pom.xml".
Hier werden Abhängigkeiten definiert und optional Build-Plugins registriert.

In diesem Projekt ist ein Maven-Wrapper integriert (.mvn und mvnw / mvnw.cmd). Über diesen kann Maven ausgeführt werden, ohne es vorher installieren zu müssen.
Beispiel unter Windows:

Kommandozeile im Projektverzeichnis öffnen und folgendes ausführen:
``` Bash
mvnw.cmd clean install spring-boot:run
```

Beim ersten Ausführen wird hier ziemlich viel heruntergeladen (Maven selbst, alle Dependencies auch die von Maven selbst und Standard-Build-Plugins).
Wiederholte Ausführungen sind dann deutlich schneller.

Der Befehl löscht das Arbeitsverzeichnis (clean), baut und kopiert die Artefakte in ein lokales Maven-Repository (install) und startet die Anwendung über einen lokalen Tomcat (spring-boot:run).
Die Anwendung ist dann unter http://localhost:8081 erreichbar.

## IDE
Einer der Vorteile von Maven ist eine standardisierte Projektstruktur. Damit findet man sich in jedem Maven-Projekt leicht zurecht und kann Maven-Projekte auch in allen gängigen IDEs
ohne Probleme bearbeiten:

 * https://www.eclipse.org/downloads/
 * https://netbeans.org/downloads/
 * https://www.jetbrains.com/idea/download/
 
In Eclipse und Intellij IDEA muss das Projekt importiert werden über die entsprechende Menüoption.
Netbeans kann Maven-Projekte einfach öffnen, da es hier keine eigene Projektdefinition gibt.

## Docker
Die Anwendung läuft auf AWS innerhalb eines Docker-Containers. Dieser wird über das Dockerfile, das im Root liegt, beschrieben.
Wenn man Änderungen an diesem File macht und diese lokal testen will, muss man sich vorher lokal Docker installieren.

Für Windows-Systeme: https://docs.docker.com/docker-for-windows/

Docker läuft auf Windows in einer virtuellen Maschine (VirtualBox), welche über docker-machine gesteuert wird. Ein gängiger Workflow nach der Installation sieht also so oder so ähnlich aus:

``` Bash
docker-machine start default
$(docker-machine env default)
docker ps # Sollte keinen Fehler bringen
docker build -t <docker-tagname> .
docker run -d -p 8081:8081 <docker-tagname>
```

Dann läuft ein Container und sollte auch über http://localhost:8081 erreichbar sein.
Falls nicht, muss der Port evtl. in VirtualBox zunächst freigeschaltet werden (Einstellungen der default-VM)

