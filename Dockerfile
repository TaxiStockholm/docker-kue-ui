FROM mhart/alpine-node:5

WORKDIR /src
ADD . .

RUN npm install --production

CMD ["npm", "start"]
