FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

WORKDIR /app/creativemishi-react

RUN npm i
RUN npm run build

WORKDIR /app

RUN cp -r creativemishi-react/build/* src/apis/rest/public


EXPOSE 3000

CMD ["npm", "start"]