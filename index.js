const serverlessExpress = require('aws-serverless-express');

const server = serverlessExpress.createServer(app);
exports.main = (event, context) => serverlessExpress.proxy(server, event, context);