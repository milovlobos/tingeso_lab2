FROM openjdk:17
ARG JAR_FILE=back_totalcost/demo/target/totalcost_service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} totalcost_service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar","/totalcost_service-0.0.1-SNAPSHOT.jar"]