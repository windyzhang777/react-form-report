# =====================
# BUILD ANGULAR WEB APP
# =====================
FROM artifactorycloud.ual.com/v-docker/node:16.18.0 as build

RUN node -v
# Create app directory
WORKDIR /usr/src/app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
COPY package*.json ./
RUN npm install
# copy all sources in the container (exclusions in .dockerignore file)
RUN echo $WORKDIR
COPY . .
RUN npm run build
RUN ls -ltr /usr/src/app/build/
# ======================
# SETUP NGINX WEB SERVER
# ======================
FROM artifactorycloud.ual.com/v-docker/nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/build/ .
# expose port 80
EXPOSE 80
CMD nginx -g 'daemon off;'