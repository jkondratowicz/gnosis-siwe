FROM node:20.13.1-alpine as appbuild

RUN yarn set version 4.2.2

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./

# @todo just skip frontend
RUN yarn workspace backend build

WORKDIR /usr/src/app/packages/backend

CMD ["node", "build/index.js"]
