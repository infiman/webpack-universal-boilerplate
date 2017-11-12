FROM node:alpine

WORKDIR /usr/infiman/swapi

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
