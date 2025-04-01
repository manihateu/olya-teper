FROM node:23

WORKDIR /app

COPY package.json yarn.lock ./

# RUN yarn install --frozen-lockfile --production
COPY . .

# RUN npx prisma generate

# RUN yarn build

EXPOSE 25565

CMD ["yarn", "run", "start:migrate:prod"]