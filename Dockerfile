FROM node:16
RUN mkdir knockapi
WORKDIR /knockapi
COPY package*.json ./
RUN npm ci
RUN apt-get install g++ -y
COPY . .
RUN npm run build
RUN chmod -R 733 ./src/c++
RUN adduser tasty 
USER tasty
EXPOSE 3001
CMD npm start
