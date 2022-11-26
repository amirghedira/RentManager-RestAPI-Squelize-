FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install --only=production
COPY ./ /app/
EXPOSE 5000
CMD [ "node", "server.js" ]