FROM openjdk:17
ARG JAR_FILE=./target/user-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /user-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","/user-service-0.0.1-SNAPSHOT.jar"]