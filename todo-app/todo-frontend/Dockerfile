FROM node:20 AS start-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000


FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY --from=start-stage /usr/src/app .

RUN npm run test


FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]