FROM node:20-alpine3.17
WORKDIR /app/usr

COPY ./package.json .
RUN npm install --omit=dev
COPY . .

CMD [ "npm","start" ]