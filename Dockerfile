FROM node:slim

WORKDIR /home/node
COPY package*.json ./
RUN npm install --production

COPY . .
EXPOSE 8085

CMD ["npm", "start"]