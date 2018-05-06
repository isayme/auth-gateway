FROM node:8.11.1-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm i --production

FROM node:8.11.1-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . /app

ARG BUILD_COMMIT=unkonwn
ENV BUILD_COMMIT ${BUILD_COMMIT}
ARG BUILD_TIME=unkonwn
ENV BUILD_TIME ${BUILD_TIME}

CMD npm start
