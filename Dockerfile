FROM node:20-slim

# Install SQLite and other dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create SQLite database directory
RUN mkdir -p db

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
