# Use an official Node.js runtime as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port your app runs on
EXPOSE 13135/tcp
EXPOSE 13136/udp

# Command to run your application
CMD ["node", "index.js"]