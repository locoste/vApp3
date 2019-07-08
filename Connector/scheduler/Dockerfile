FROM node:8

LABEL vf-OS=true
LABEL vf-OS.author="lCoste l.coste@univ-lyon2.fr"
LABEL vf-OS.name="schedulerConnector"
LABEL vf-OS.description="scheduler Connector for node"

WORKDIR /usr/src/app

COPY * ./

RUN npm install

EXPOSE 3000
CMD [ "npm", "start", "scheduler" ]