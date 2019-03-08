const { config, DynamoDB } = require("aws-sdk");
const cfgUpdate = require('./aws-config');

config.update(cfgUpdate);

const docClient = new DynamoDB.DocumentClient();
//var table = "comparisons";
let params = {
  TableName: "comparisons",
  Key:{}
};

const get = (comparisonId, res) => {
  params.Key.id = comparisonId;
  docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      res.send({err: 'fucked up'});
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      res.send(data);
    }
  });
};

const scan = (res) => {
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.send(data);
      // print all the Cars
      console.log("Scan succeeded.");
      data.Items.forEach(function(car) {
        //console.log(car.id, car.type, car.name)
      });
      if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, onScan);
      }
    }
  });
};

module.exports = {get, scan};
