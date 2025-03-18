# Stage 1: Build
FROM node:18 as builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

RUN rm .env

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm i -g serve

# Copy the built application code
COPY --from=builder /app/dist ./

# Expose the port the app will run on
EXPOSE 5173

# Run the command to start the app
CMD [ "serve", "-s", "." ]
