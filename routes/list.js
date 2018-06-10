'use strict';

const chalk = require('chalk')

module.exports.main = (event, context, callback) => {

  console.log('test variable: ', chalk.magenta(process.env.TEST_VAR))

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
