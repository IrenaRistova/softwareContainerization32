FROM node

WORKDIR /frontend

COPY package.json .
RUN npm i axios react react-dom react-icons react-router-dom

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD ["npm", "run", "dev"]