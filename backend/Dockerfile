FROM node:12-alpine
EXPOSE 3001
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN chmod +x ./wait-for.sh
CMD npm run start:nodemon