FROM node:16.15.0-alpine

WORKDIR ./src/frontend
COPY package.json .
RUN npm install

ENTRYPOINT [ "npm", "start" ]