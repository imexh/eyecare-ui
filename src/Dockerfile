FROM node:21.4.0 as build
WORKDIR /eyecare-ui

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /eyecare-ui/build /usr/share/nginx/html