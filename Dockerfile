
FROM node:20-alpine AS build

WORKDIR /app

ARG API_URL
ENV API_URL=$API_URL

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --prefer-offline --no-audit


COPY . .

RUN npx ts-node scripts/set-env.ts

RUN npm run build -- --configuration production

FROM nginx:1.26.2-alpine

COPY --from=build /app/dist/angular-conduit /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]