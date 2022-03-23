#!/bin/bash

FROM node:16.14.0
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm ci --only-production
 
COPY . .

EXPOSE 8081

CMD [ "node", "server.js" ]
