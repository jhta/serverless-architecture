const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-west-1" });

const dynamodb = new AWS.DynamoDB();

async function listTables() {
  dynamodb.listTables({}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(data);
  });
}

function describeNotesTable() {
  dynamodb.describeTable(
    {
      TableName: "td_notes",
    },
    (err, data) => console.log(err ? err : JSON.stringify(data))
  );
}

const cb = (err, data) =>
  console.log(err ? err : JSON.stringify(data, null, 2));

function createTable() {
  dynamodb.createTable(
    {
      TableName: "td_nodes_sdk",
      AttributeDefinitions: [
        {
          AttributeName: "user_id",
          AttributeType: "S",
        },
        {
          AttributeName: "timestamp",
          AttributeType: "N",
        },
      ],
      KeySchema: [
        { AttributeName: "user_id", KeyType: "HASH" },
        { AttributeName: "timestamp", KeyType: "RANGE" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
    cb
  );
}

function updateTable() {
  dynamodb.updateTable(
    {
      TableName: "td_nodes_sdk",
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 1,
      },
    },
    cb
  );
}

function deleteTable() {
  dynamodb.deleteTable(
    {
      TableName: "td_nodes_sdk",
    },
    cb
  );
}

createTable();
// listTables();
// updateTable();
// deleteTable();
