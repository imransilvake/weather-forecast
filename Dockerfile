# Node Image
FROM node:alpine

# A directory within the virtualized Docker environment
WORKDIR /app

# Copies package.json to Docker environment
COPY package.json /app

# Install all node packages
RUN yarn install --silent

# Copies everything over to Docker environment
COPY . /app

# Builds the application
CMD [ "yarn", "build" ]
