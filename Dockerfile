FROM node:16.15.1-alpine3.14 as base
WORKDIR /app

FROM base as sysdeps
RUN apk add --no-cache python3 py3-pip make g++

FROM sysdeps AS prod_dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn --production=true

FROM prod_dependencies as dev_dependencies
RUN yarn --production=false

FROM dev_dependencies AS builder
COPY . .
RUN yarn prettier
RUN yarn lint
RUN yarn test
RUN yarn build

FROM base
ENV DOCKER=true \
    NODE_ENV=production
COPY package.json .
COPY --from=prod_dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY ./assets ./assets

ENTRYPOINT ["node", "/app/dist/index.js"]
