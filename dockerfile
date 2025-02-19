# specify the node base image with your desired version node:<version>
# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:12-alpine also works here for a smaller image
FROM node:17-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
# ARG NODE_ENV=production
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=8443
ENV PORT $PORT
EXPOSE $PORT

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
# RUN npm i npm@latest -g

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
ARG APPDIR=/opt/alice_multicommands
RUN mkdir -p ${APPDIR} && chown node:node ${APPDIR}
WORKDIR ${APPDIR}
# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app.
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
COPY --chown=node:node package.json package-lock.json*  ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH ${APPDIR}/node_modules/.bin:$PATH

# RUN mkdir ssl
VOLUME [ "${APPDIR}/ssl" ]

# copy in our source code last, as it changes the most
# copy in as node user, so permissions match what we need
# WORKDIR /opt/alice_multicommands/app
COPY --chown=node:node . .

# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]


# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
# CMD [ "node", "index.js" ]
CMD [ "npm", "start" ]