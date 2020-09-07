const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const cb = (err, data) =>
  console.log(err ? err : JSON.stringify(data, null, 2));

const TABLE = "td_nodes_sdk";

function getItem() {
  docClient.get(
    {
      TableName: TABLE,
      Key: {
        user_id: "ABC",
        timestamp: 1,
      },
    },
    cb
  );
}

function queryItem() {
  docClient.query(
    {
      TableName: TABLE,
      KeyConditionExpression: "user_id = :uid",
      ExpressionAttributeValues: {
        ":uid": "ABC",
      },
    },
    cb
  );
}

queryItem();
