FROM openjdk:17
ARG JAR_FILE=gateway-service/target/gateway-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} gateway-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","/gateway-service-0.0.1-SNAPSHOT.jar"]