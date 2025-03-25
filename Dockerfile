FROM node:23

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 25565

CMD ["npx", "prisma", "generate", "&&", "yarn", "run", "dev"]