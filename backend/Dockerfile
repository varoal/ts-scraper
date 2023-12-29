FROM node:18.15-alpine

RUN mkdir /src && chown node:node /src

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

USER node

CMD ["npm", "start"]