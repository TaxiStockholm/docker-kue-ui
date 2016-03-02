FROM node:4.2

WORKDIR /src
ADD . .

RUN npm install --production

EXPOSE 5000
CMD ["npm", "start"]
