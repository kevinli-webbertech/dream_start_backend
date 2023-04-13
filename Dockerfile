# Use Node.js 14 as the base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .
COPY .env.example .env
# Build the Next.js application for production
#RUN npm run build
RUN npm run build
EXPOSE 1337
# Set the command to start the application
CMD ["npm", "run", "start"]
