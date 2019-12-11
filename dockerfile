FROM node:10
COPY . /instagras-client
WORKDIR /instagras-client
RUN npm install -g cordova ionic
RUN npm install -g bower
RUN npm install -g gulp
CMD ionic serve --address=0.0.0.0 -- --disable-host-check