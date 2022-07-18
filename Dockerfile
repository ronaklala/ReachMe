FROM node:14

WORKDIR /fontend

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]