FROM node
WORKDIR /
COPY . .
RUN npm install
CMD ["node", "server.js"]
EXPOSE 3002