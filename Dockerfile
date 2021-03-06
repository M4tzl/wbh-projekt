FROM openjdk:8-jdk-alpine
# curl 169.254.170.2$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI | jq im Container gibt Credentials zurueck
RUN apk add --no-cache curl jq
VOLUME /tmp
ADD target/tier-fair-mittlung.jar tier-fair-mittlung.jar
EXPOSE 80 443
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=prod", "-jar","/tier-fair-mittlung.jar"]
