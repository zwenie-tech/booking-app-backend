FROM node:20-alpine
ARG DATABASE_URL

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run db:generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
