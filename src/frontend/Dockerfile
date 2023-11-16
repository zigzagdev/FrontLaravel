FROM node:16.15.0-alpine

WORKDIR /usr/src/frontend
COPY . .
RUN npm install
RUN npm run build
ENTRYPOINT npm start