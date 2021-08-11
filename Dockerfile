FROM node:14.16.1-alpine

RUN mkdir /bot
WORKDIR /bot
COPY . ./
ENV NODE_ENV=production
RUN npm install

CMD [ "npm", "start" ]
