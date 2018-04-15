# Frameworks

## Spring / Spring Boot

Als Applikationsframework wird Spring bzw. [Spring Boot](https://projects.spring.io/spring-boot/) eingesetzt.
Im speziellen folgendes:
 * [Spring Boot MVC](https://spring.io/guides/gs/serving-web-content/) mit [Thymeleaf](https://www.thymeleaf.org/) als Templateengine
 * [Spring Data JPA](https://projects.spring.io/spring-data-jpa/) für Datenbankzugriff und OR-Mapping
 
### Schnelleinstieg

Prinzipiell ist die Doku von Spring Boot-Projekten sehr gut und es ist damit empfehlenswert sich dort kurz einzulesen.
Hier aber ein paar Dinge, die für den Einstieg nützlich sind:
 * Spring Boot setzt sehr auf "Convention over Configuration", d.h. es gibt sehr viele Defaults und Annahmen, die ohne jegliche Konfiguration greifen
   So ist ein Default bspw. dass unter src/main/resources/db/changelog eine Datei db.changelog-master.yaml liegen muss, um automatisch bei jedem Applikations-Startup eine Liquibase-Datenbankmigration durchzuführen.
 * Spring arbeitet exzessiv mit Java-Annotationen. Der Code wird so sehr schlank und deklarativ, jedoch muss man wissen, was sich hinter einzelnen Annotationen verbirgt (das kann eine Menge sein) 
   => hier die sehr gute Spring-Doku auf jeden Fall zu Rate ziehen
   
## Lombok
[Project Lombok](https://projectlombok.org/) ist ein Compiler-Plugin, mit dem sich Java-Boilerplate deutlich reduzieren lässt.
So erzeugt folgender Code:

``` Java
@lombok.Getter
public class Test {
	private String x;
	private int y;
}
```

folgenden Code:

``` Java
public class Test {
	private String x;
	private int y;
	
	public String getX(){
		return x;
	}
	
	public int getY(){
		return y;
	}
}
```

Damit das funktioniert ist eine Maven-Dependency notwendig. Außerdem gibt es für alle gängigen IDEs Plugins, damit dort der Umgang mit dem generierten Code vernünftig funktioniert.
Dazu bitte auf der Project Lombok-Website für die eigene IDE nachlesen, wie die Installation funktioniert