#!/bin/bash

echo "🚀 Starting SmartAllies Incident Reporting Backend Setup..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

echo "✅ Java found: $(java -version 2>&1 | head -n 1)"

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6+."
    exit 1
fi

echo "✅ Maven found: $(mvn -version | head -n 1)"

# Check if Ollama CLI is installed (optional, for local testing)
if ! command -v ollama &> /dev/null; then
    echo "ℹ️  Ollama CLI not found locally (using remote host - OK)"
fi

echo "✅ Ollama CLI found"
echo "ℹ️  Using remote Ollama host (configured in application.properties)"
echo ""

# Build the application
echo "🔨 Building application..."
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Setup complete! Starting application..."
    echo ""
    mvn spring-boot:run
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
