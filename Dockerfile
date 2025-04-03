# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

# Copy database schema
COPY src/lib/db/schema.sql ./src/lib/db/

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
