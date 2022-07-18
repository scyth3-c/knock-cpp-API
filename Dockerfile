FROM node:16
RUN mkdir knockapi
WORKDIR /knockapi
COPY package*.json ./
RUN npm ci
RUN apt-get install g++ -y && apt-get install make
COPY . .

RUN npm run build
RUN make install

RUN chmod -R 733 ./src/controller
RUN chmod -R 733 ./src/middleware
RUN chmod -R 733 ./src/model
RUN chmod -R 733 ./src/server
RUN chmod -R 733 ./src/routes

RUN chmod -R 733 ./src/c++
RUN adduser tasty 
USER tasty

EXPOSE 3001
CMD npm start
