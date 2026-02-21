FROM node:20.12.2
WORKDIR .

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

EXPOSE 8080
ENV NODE_ENV=production

RUN make build

CMD ["make", "start"]