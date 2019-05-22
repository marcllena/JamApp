FROM node:11.13
 
WORKDIR  /jamapp/frontend/

COPY package*.json /jamapp/frontend/
 
RUN npm install -g ionic

RUN npm install

COPY . /jamapp/frontend/

EXPOSE 8100

ENTRYPOINT ionic serve
