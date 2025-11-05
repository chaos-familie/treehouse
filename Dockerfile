FROM oven/bun:alpine

WORKDIR /app

COPY . .

ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "/app/server/index.mjs"]
