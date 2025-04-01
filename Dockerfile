FROM node:23

WORKDIR /app

RUN chown -R node:node /app
USER node

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN ls -laR /app

RUN npx prisma generate

EXPOSE 25565

CMD ["yarn", "run", "start:migrate:prod"]