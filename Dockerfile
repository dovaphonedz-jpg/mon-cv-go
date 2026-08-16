FROM node:22-slim

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies cleanly
RUN npm install

# Copy source files (node_modules excluded via .dockerignore)
COPY . .

# Build Vite frontend bundle
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

ENV PORT=3001
EXPOSE 3001

CMD ["node", "server.js"]
