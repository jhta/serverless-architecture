module.exports.add = async (event) => {
  const { num1, num2 } = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ result: num1 + num2 }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};