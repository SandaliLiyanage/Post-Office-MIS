FROM node:20
WORKDIR /app
COPY package.json /app
COPY prisma /app/prisma
RUN npm install
RUN npx prisma generate
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]

