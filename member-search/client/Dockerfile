FROM node as build
RUN mkdir -p /build
COPY . /build/
WORKDIR /build
RUN npm install -g npm
RUN npm install -g @angular/cli
RUN npm install
RUN ng build

FROM nginx
COPY --from=build /build/dist/* /usr/share/nginx/html
EXPOSE 80