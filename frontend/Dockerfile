FROM node:11.13
 

WORKDIR  /frontend

 

COPY ./ /frontend/

 
RUN npm install -g ionic

RUN npm install

 

EXPOSE 8100

 

ENTRYPOINT ionic serve
