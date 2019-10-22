FROM node:alpine

ENV ASSET_NAME="vApp33"

RUN mkdir -p /Server
WORKDIR /Server

COPY . .

RUN ls -a

RUN npm install
RUN ls -a node_modules
RUN chmod +x entrypoint.sh

EXPOSE 8002

LABEL vf-OS.author="lyon2"
LABEL vf-OS.name="vApp33"
LABEL vf-OS.description="Pilot 3 - vApp33"
LABEL vf-OS=true
LABEL vf-OS.frontendUri=/login.html
LABEL vf-OS.icon=img/2.png
LABEL vf-OS.urlprefixReplace=true

CMD ["npm", "start"]
