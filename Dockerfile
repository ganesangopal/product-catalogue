# Extending image
FROM node:carbon

RUN apt-get update
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Versions
RUN npm -v
RUN node -v

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . /usr/src/app

# Port to listener
# EXPOSE 3000

# Environment variables
ENV NODE_ENV production
# ENV PORT 3000
# ENV PUBLIC_PATH "/"

RUN npm run-script build-prod

# Main command
CMD [ "npm", "run-script", "start" ]