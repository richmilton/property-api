// const { config, DynamoDB } = require('aws-sdk');
const { docClient } = require('./aws-config');

const deleteComparison = (comparisonId, onError, onSuccess) => {
  console.log(comparisonId);
  const params = {
    TableName: 'comparisons',
    Key: { id: comparisonId },
  };
  docClient.delete(params, (err) => {
    if (err) {
      console.error("Unable to delete comparison", comparisonId, ". Error JSON:", JSON.stringify(err, null, 2));
      onError(err.errno);
    } else {
      console.log("DeleteItem succeeded:", comparisonId);
      onSuccess(200);
    }
  });
};

module.exports = { deleteComparison };