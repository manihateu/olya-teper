FROM node:23

WORKDIR /app

COPY package.json yarn.lock ./
RUN npm install
COPY . .

RUN ls -laR /app

RUN npx prisma generate

EXPOSE 25565

CMD ["yarn", "run", "start:migrate:prod"]