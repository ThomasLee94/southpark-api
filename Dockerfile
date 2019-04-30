FROM node:11.12.0

RUN mkdir -p /usr/src/app

# working directory (for container)
WORKDIR /usr/src/app

# dependencies (both package and package.lock)
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

# port
EXPOSE 3000

CMD ["npm","start"]