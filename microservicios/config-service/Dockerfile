FROM openjdk:17
ARG JAR_FILE=config-service/target/config-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} config-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","/config-service-0.0.1-SNAPSHOT.jar"]