# Incident Reporting Backend

Spring Boot backend for the SmartAllies Incident Reporting Chatbot system.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring AI** - LLM integration
- **Ollama** - Local LLM provider
- **Maven** - Build tool

## Prerequisites

1. **Java 17 or higher**
   ```bash
   java -version
   ```

2. **Maven 3.6+**
   ```bash
   mvn -version
   ```

3. **Remote Ollama Host** (configured)
   - Update `application.properties` with your Ollama host URL:
     ```properties
     spring.ai.ollama.base-url=http://your-ollama-host:11434
     ```
   - Ensure your Ollama host has the required models:
     - llama3.2 (for chat)
     - nomic-embed-text (for embeddings)

## Quick Start

### 1. Configure Remote Ollama Host
Edit `src/main/resources/application.properties`:
```properties
spring.ai.ollama.base-url=http://your-ollama-host:11434
```

### 2. Build the Application
```bash
cd backend
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## API Endpoints

### Chat Endpoint
**POST** `/api/chat`

Request:
```json
{
  "sessionId": "unique-session-id",
  "message": "I want to report harassment",
  "imageUrl": "optional-image-url"
}
```

Response:
```json
{
  "message": "I understand this is a human incident...",
  "incidentType": "HUMAN",
  "workflowState": "AWAITING_CLASSIFICATION_CONFIRMATION",
  "suggestedActions": ["Yes", "No"],
  "resources": ["..."],
  "metadata": {}
}
```

### Health Check
**GET** `/api/health`

## Configuration

Edit `src/main/resources/application.properties`:

```properties
# Ollama Configuration
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=llama3.2
spring.ai.ollama.chat.options.temperature=0.7

# Server Configuration
server.port=8080

# CORS
cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

## Architecture

### Package Structure
```
com.smartallies.incident/
├── controller/          # REST endpoints
├── service/            # Business logic
│   ├── ChatOrchestrationService    # Main workflow orchestration
│   ├── LlmService                  # Ollama integration
│   ├── ConversationContextService  # Session management
│   └── ResourceService             # Static resources
├── model/              # Domain models
├── dto/                # Data transfer objects
├── config/             # Spring configuration
└── util/               # Utilities (prompts, helpers)
```

### Workflow States
1. **INITIAL** - User sends first message
2. **AWAITING_CLASSIFICATION_CONFIRMATION** - Bot asks for confirmation
3. **CLASSIFICATION_CONFIRMED** - Type confirmed, show resources
4. **COLLECTING_DETAILS** - Gathering required fields
5. **AWAITING_REPORT_CONFIRMATION** - Ask if user wants to draft report
6. **REPORT_READY** - Summary generated, ready to submit
7. **EMERGENCY_ACTIVE** - Emergency protocol activated
8. **COMPLETED** - Workflow finished

### Incident Types
- **HUMAN** - Harassment, discrimination, mental health
- **FACILITY** - Equipment damage, maintenance issues
- **EMERGENCY** - Immediate danger, medical emergencies

## Development

### Hot Reload
The application includes Spring DevTools for automatic restart on code changes.

### Logging
Set logging level in `application.properties`:
```properties
logging.level.com.smartallies=DEBUG
logging.level.org.springframework.ai=DEBUG
```

### Testing
```bash
mvn test
```

## Troubleshooting

### Ollama Connection Issues
1. Verify remote Ollama host is accessible
2. Check the base URL in application.properties
3. Ensure firewall allows connection to Ollama host port 11434
4. Test connection: `curl http://your-ollama-host:11434/api/tags`

### Port Already in Use
Change the port in `application.properties`:
```properties
server.port=8081
```

### CORS Issues
Add your frontend URL to allowed origins:
```properties
cors.allowed-origins=http://localhost:5173,http://your-frontend-url
```

## Next Steps

1. ✅ Core chat workflow implemented
2. ⏳ Add file upload endpoint for images
3. ⏳ Implement submission persistence (database)
4. ⏳ Add authentication/authorization
5. ⏳ Implement actual Samaritan alert system
6. ⏳ Add ChromaDB integration for RAG

## License

Proprietary - SmartAllies
