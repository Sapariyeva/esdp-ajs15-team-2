# FROM alpine
# EXPOSE 5173
# WORKDIR /app
# RUN apk add --update nodejs npm
# COPY . .
# RUN npm ci
# CMD ["npm", "run", "dev"]

# FROM node:18.13.0-alpine
# WORKDIR /app
# COPY ./package.json .
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev"]

FROM node:lts-alpine as builder
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as prod-build
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /front/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]