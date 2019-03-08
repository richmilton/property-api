//import { config, DynamoDB } from '../node_modules/aws-sdk';
const { config, DynamoDB } = require("aws-sdk");
const cfgUpdate = require('./aws-config');

config.update(cfgUpdate);

const docClient = new DynamoDB.DocumentClient();

const insert = (comp, callback) => {
  comp.id = `${Date.now()}`;
  const params = {
    TableName: "comparisons",
    Item: comp
  };
  docClient.put(params, (err) => {
    if (err) {
      console.error("Unable to add comparison", comp.projectName, ". Error JSON:", JSON.stringify(err, null, 2));
      callback(500);
    } else {
      console.log("PutItem succeeded:", comp.projectName);
      callback(comp);
    }
  });
};

module.exports = {load: insert};