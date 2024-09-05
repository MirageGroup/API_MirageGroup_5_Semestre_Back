# Backend Dockerfile - Node.js API Server
FROM node:16

# Set working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN npm install --production

# Copy project files
COPY . .

# Expose the port where the server will run
EXPOSE 3000

# Command to start the backend server
CMD ["node", "server.js"]
