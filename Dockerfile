FROM node:16
WORKDIR /knockapi
COPY package*.json ./
RUN npm install
RUN apt-get install g++
COPY . .
EXPOSE 3001
RUN npm run build
RUN chmod -R 733 ./src/c++
RUN groupadd -g 1002 kevin && useradd -r -u 1002 -g kevin kevin
USER kevin
CMD ["npm","run","start"]
