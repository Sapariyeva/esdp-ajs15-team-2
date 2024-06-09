# FROM alpine
# EXPOSE 5000
# WORKDIR /app
# RUN apk add --update nodejs npm
# COPY . .
# RUN npm ci
# CMD npm run dev


FROM node:lts-alpine AS builder
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]

