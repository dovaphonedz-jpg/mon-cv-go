FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

ENV PORT=3001
EXPOSE 3001

CMD ["node", "server.js"]
