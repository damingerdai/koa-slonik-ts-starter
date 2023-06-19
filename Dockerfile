FROM node:20.3.0-alpine3.18 as build

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false

COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --non-interactive
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . /app

RUN yarn build

FROM build AS ci
WORKDIR /app
RUN yarn run test:ci && yarn install --frozen-lockfile --non-interactive --production


FROM node:20.3.0-alpine3.18 as release

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false

RUN mkdir -p /app

WORKDIR /app
COPY --from=ci /app/dist ./dist
COPY --from=ci /app/node_modules ./node_modules
COPY --from=ci /app/package.json .

# Define the url as the healthcheck
HEALTHCHECK --interval=30s --timeout=30s CMD curl --fail http://localhost:3000/ping || exit 1

# Start 'er up
EXPOSE 3000
CMD ["sh", "-c", "node dist/server.js"]
