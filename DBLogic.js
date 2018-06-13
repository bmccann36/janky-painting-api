




const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();


  var params = {
    TableName: 'janky-posts-staging'
  };

  return dynamoDb.scan(params).promise()
  .then(res => console.log(res))




