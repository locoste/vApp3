FROM node:8

LABEL vf-OS=true
LABEL vf-OS.author="lCoste l.coste@univ-lyon2.fr"
LABEL vf-OS.name="classificationConnector"
LABEL vf-OS.description="classification Connector for node"
LABEL vf-OS.processEndPoints="[{"name":"CheckManufacturingOrderConsistency","method":"POST","uri":"/CheckManufacturingOrderConsistency","inputs":[{"section":"form","name":"json","type":{"name":"Object"},"isRequired":false}],"output":[{"name":"result", "type":"boolean"}],"header":[{"name":"Content-Type","value":"application/json"}]}]"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json package.json
RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm", "start", "classification" ]