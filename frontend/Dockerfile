FROM node:14

WORKDIR /app

COPY ./quiz-app/package*.json ./
RUN npm install

COPY ./quiz-app/public ./public
COPY ./quiz-app/src ./src

EXPOSE 3000

CMD ["npm", "start"]
