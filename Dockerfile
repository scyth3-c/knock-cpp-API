FROM node:20-bullseye

RUN mkdir knockapi
WORKDIR /knockapi

COPY package*.json ./
RUN  npm ci

RUN apt-get update && apt-get install -y g++ make 

COPY . .

RUN make install
RUN npm run build

EXPOSE 3001

RUN useradd -ms /bin/bash tasty
RUN chown -R tasty:tasty /knockapi/src/c++

# Cambiar permisos para app.js y archivos generados
RUN chown tasty:tasty /knockapi/build/src/server/app.js
RUN chmod 700 /knockapi/build/src/server/app.js

# Cambiar permisos para la carpeta build y subdirectorios
RUN chown -R tasty:tasty /knockapi/build
RUN chmod -R 700 /knockapi/build

USER tasty

CMD node ./build/src/server/app.js