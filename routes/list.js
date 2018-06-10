'use strict';

const chalk = require('chalk')
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const readYaml = require('read-yaml');

let localEnv
try { localEnv = readYaml.sync('env.yml').local; }
catch (e) { console.log('env not local') }
const environment = localEnv ? localEnv : process.env



module.exports.main = (event, context, callback) => {

  console.log('test variable: ', chalk.magenta(process.env.TEST_VAR))

  var params = {
    TableName: environment.POSTS_TABLE,
  };

  dynamoDb.scan(params).promise()
    .then(res => {
      // format success response
      callback(null, buildResponse(200, res.Items))
    })
    .catch(err => {
      // format error response
      callback(null, buildResponse(500, err))
    })

};

// module.exports.main({}, null, (err, scc) => {
//   if (err) console.log(err)
//   else console.log(scc)
// })


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
