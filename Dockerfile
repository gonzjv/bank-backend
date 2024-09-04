FROM node:slim

WORKDIR /home/node
COPY package*.json ./
RUN npm install --production

COPY . .

CMD ["npm", "start"]