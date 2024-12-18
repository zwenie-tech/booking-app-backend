FROM node:20

# Install libssl 1.1
RUN apt-get update && apt-get install -y libssl1.1 && rm -rf /var/lib/apt/lists/*

ARG DATABASE_URL

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run db:generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
