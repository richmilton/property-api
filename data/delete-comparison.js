const { config, DynamoDB } = require('aws-sdk');
const cfgUpdate = require('./aws-config');

config.update(cfgUpdate);

const docClient = new DynamoDB.DocumentClient();

const deleteComp = (comparisonId, callback) => {
  console.log(comparisonId);
  const params = {
    TableName: 'comparisons',
    Key: { id: comparisonId },
  };
  docClient.delete(params, (err) => {
    if (err) {
      console.error("Unable to delete comparison", comparisonId, ". Error JSON:", JSON.stringify(err, null, 2));
      callback(500);
    } else {
      console.log("DeleteItem succeeded:", comparisonId);
      callback(200);
    }
  });
};

module.exports = { deleteComp };