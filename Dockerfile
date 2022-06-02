FROM node:18.2-alpine3.14

# Alpine LinuxでUbuntuのパッケージマネージャー（apt-get）は使えない
RUN apk update
RUN apk add sudo

RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*

RUN mkdir ts_algorithms_practice
WORKDIR /ts_algorithms_practice
