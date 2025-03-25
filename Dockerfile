FROM node:23

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 25565

RUN npx prisma generate

CMD ["yarn", "run", "dev"]