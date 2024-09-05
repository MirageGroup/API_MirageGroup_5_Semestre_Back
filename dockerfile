# Backend Dockerfile - Node.js API Server
FROM node:16

# Set working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package.json ./
RUN rm -rf node_modules
RUN npm install

# Copy project files
COPY . .

# Expose the port where the server will run
EXPOSE 3000

# Command to start the backend server
CMD ["npm", "run", "dev"]
