FROM node:23

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

RUN npx prisma generate

EXPOSE 25565

CMD ["yarn", "run", "start:migrate:prod"]