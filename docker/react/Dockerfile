FROM node:16.15.0-alpine

WORKDIR ../src/frontend
COPY ../../src/frontend .
RUN npm install
RUN npm run build
ENTRYPOINT npm start