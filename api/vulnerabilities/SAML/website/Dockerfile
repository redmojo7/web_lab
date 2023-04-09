FROM node:14

WORKDIR /app

COPY package*.json ./

#RUN npm install
RUN npm install

# Replace passport-saml with local copy
# This is a vulnerability of not checking signature for SAML response
COPY ./node_modules/passport-saml/lib/passport-saml/saml.js ./node_modules/passport-saml/lib/passport-saml/saml.js

COPY ./certs .
COPY views views
COPY app.js .

EXPOSE 9100

CMD ["npm", "start"]
