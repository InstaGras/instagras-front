FROM node:10
COPY . /instagras-client
WORKDIR /instagras-client
RUN npm install -g cordova ionic
RUN npm install -g bower
RUN npm install -g gulp
EXPOSE 8100
CMD [ "ionic", "serve", "--port", "8100", "--adress", "0.0.0.0:8100"]