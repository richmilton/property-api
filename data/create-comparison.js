//import { config, DynamoDB } from '../node_modules/aws-sdk';
// const { config, DynamoDB } = require("aws-sdk");
const { docClient } = require('./aws-config');

const createComparison = (comp, onError, onSuccess) => {
  comp.id = `${comp.email}#${Date.now()}`;
  const params = {
    TableName: "comparisons",
    Item: comp
  };
  docClient.put(params, (err) => {
    if (err) {
      console.error("Unable to add comparison", comp.projectName, ". Error JSON:", JSON.stringify(err, null, 2));
      onError(err.errno);
    } else {
      console.log("PutItem succeeded:", comp.projectName);
      onSuccess(comp);
    }
  });
};

module.exports = { createComparison };
