# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container

RUN npm install -g nodemon


WORKDIR /backend

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package.json .

# Install dependencies
# If you want to install only production dependencies, use: npm install --only=production
RUN npm install

# Copy the rest of your application's code
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 6001

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "server.js"]

