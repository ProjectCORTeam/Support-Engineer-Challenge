# TaskMaster Challenge - Dockerfile
FROM node:18-alpine

# Install sqlite3 for CLI access
RUN apk add --no-cache sqlite

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p data

# Make entrypoint executable
RUN chmod +x scripts/entrypoint.sh

# Expose port
EXPOSE 3000

# Run entrypoint script (migrate, seed, then start server)
CMD ["./scripts/entrypoint.sh"]

