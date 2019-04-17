const { config, DynamoDB } = require('aws-sdk');

const cfgUpdate = {
  accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_DYNAMO_SECRET_ACCESS_KEY,
  region: process.env.AWS_DYNAMO_REGION,
};

config.update(cfgUpdate);

const docClient = new DynamoDB.DocumentClient();

module.exports = { docClient };
