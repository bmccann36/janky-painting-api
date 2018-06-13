'use strict';

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.main = (event, context, callback) => {

  // console.log('ENV VAR: ', process.env.MY_VAR)
  // console.log('arbitrary change')
  var params = {
    TableName: process.env.POSTS_TABLE
  };

  dynamoDb.scan(params).promise()
    .then(res => {
      // console.log(res.Items)
      callback(null, buildResponse(200, res.Items))
    })
    .catch(err => {
      // console.log(err)
      callback(null, buildResponse(500, err))
    })

};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
