# pull official base image
FROM node:14.9

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
# COPY package*.json ./

# add app
COPY . .
RUN npm install

EXPOSE 3000

# start app
CMD ["npm", "start"]