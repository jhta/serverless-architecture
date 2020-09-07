const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

const cb = (err, data) =>
  console.log(err ? err : JSON.stringify(data, null, 2));

const TABLE = "td_nodes_sdk";

function insertItem() {
  docClient.put(
    {
      TableName: TABLE,
      Item: {
        user_id: "124dfdw",
        timestamp: 1,
        title: "title",
        content: "content",
        cat: "general",
        note_id: "note_id12321",
      },
    },
    cb
  );
}

function listItems() {
  docClient.query({}, cb);
}

function deleteItem() {
  docClient.delete(
    {
      TableName: TABLE,
      Key: {
        user_id: "124dfdw",
        timestamp: 1,
      },
    },
    cb
  );
}

insertItem();
// deleteItem();
