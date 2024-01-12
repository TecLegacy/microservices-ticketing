FROM node:20-alpine

WORKDIR /app/usr

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3100

# docker build -t nextjs-docker .
# docker run -p 3000:3000 nextjs-docker
