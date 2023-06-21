FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3173

CMD [ "npm", "run", "preview" ]