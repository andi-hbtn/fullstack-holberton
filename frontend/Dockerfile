# build stage
FROM node:18-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build > build-output.log 2>&1 || (cat build-output.log && exit 1)
RUN node --max-old-space-size=2048 node_modules/.bin/react-scripts build

# production stage
FROM nginx:stable AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
