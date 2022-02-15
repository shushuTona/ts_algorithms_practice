FROM node:14-alpine

# Alpine LinuxでUbuntuのパッケージマネージャー（apt-get）は使えない
RUN apk update
RUN apk add sudo
RUN apk add git
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
