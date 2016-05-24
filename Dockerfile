FROM node:4.2

WORKDIR /src
ADD . .

RUN npm install --production

CMD ["npm", "start"]
