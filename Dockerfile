FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
COPY pom.xml build/pom.xml
COPY src /build/src/
WORKDIR /build
RUN mvn package install -DskipTests
FROM openjdk:8-jdk-alpine
COPY --from=MAVEN_BUILD /build/target/*.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"] 
