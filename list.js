
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const documentClient = new AWS.DynamoDB.DocumentClient();


exports.main = function main(event, context, callback) {
  const params = {
    TableName: 'janky-posts',
  };

  return documentClient.scan(params).promise()
    .then(res => {
      // console.log(res)
      callback(null, buildResponse(200, res.Items))
    })
    .catch(err => {
      return buildResponse(500, err)
    })
}


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


// main({}) //?
