const { config, DynamoDB } = require("aws-sdk");
const { cfgUpdate } = require('./aws-config');

config.update(cfgUpdate);

const docClient = new DynamoDB.DocumentClient();
//var table = "comparisons";
let params = {
  TableName: "comparisons",
  Key:{}
};

const getComparison = (comparisonId, onError, onSuccess) => {
  params.Key.id = comparisonId;
  docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      onError(err.errno);
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      onSuccess(data);
    }
  });
};

const getComparisons = (onError, onSuccess) => {
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      onError(err.errno);
    } else {
      onSuccess(data);
      console.log("Scan succeeded.");
    }
  });
};

module.exports = { getComparison, getComparisons };
