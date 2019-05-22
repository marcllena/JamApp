FROM node:11.13

WORKDIR /jamapp/backend/

COPY package*.json /jamapp/backend/

RUN npm install

COPY . /jamapp/backend/

EXPOSE 3000

CMD ["npm", "start"]
