FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copiar apenas o arquivo pom.xml primeiro para cachear as dependências
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN ./mvnw dependency:go-offline

# Copiar o código fonte e buildar
COPY src src
RUN ./mvnw package -DskipTests

# O jar gerado estará em target/
# Assumindo que o nome do jar seja algo padronizado ou pegando com wildcard no comando
CMD ["java", "-jar", "target/projeto-arquitetura-backend-0.0.1-SNAPSHOT.jar"]
