FROM openjdk:17
ARG JAR_FILE=demo/target/evaluation-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} evaluation-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","/evaluation-service-0.0.1-SNAPSHOT.jar"]