const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const cb = (err, data) =>
  console.log(err ? err : JSON.stringify(data, null, 2));

const TABLE = "td_nodes_sdk";

docClient.put(
  {
    TableName: TABLE,
    Item: {
      user_id: "ABC",
      timestamp: 1,
      title: "title",
      content: "content",
    },
    ConditionExpression: "#t <> :t",
    ExpressionAttributeNames: {
      "#t": "timestamp",
    },
    ExpressionAttributeValues: {
      ":t": 1,
    },
  },
  cb
);
