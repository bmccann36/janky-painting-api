import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import moment from 'moment'

export async function main(event, context, callback) {

  // const time = 1528642443

  const params = {
    TableName: 'janky-posts',
    Key: {
      'post-time': 1528642443
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}


main({}, null, (err, success) => {
  if (err) console.log(err)
  if (success) console.log(success)
})
