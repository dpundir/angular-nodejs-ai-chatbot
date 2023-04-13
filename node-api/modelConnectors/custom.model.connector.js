const request = require('request');
const modelConfig = require('./../modelConnectors/model.config');

function customModelConnector(req, res, next, provider, model, text) {
    var query = {
      data: [text]
    }
    console.log('query: ', query);
  
    return request.post({
        url: modelConfig.getProviderProperty(provider, 'URL'),
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(query)
      }, 
      function(error, response, body){
        if (!error && response.statusCode == 200) {
          const responseBody = JSON.parse(body);
          console.log('answer: ', responseBody.data[0]);
          res.json(responseBody.data[0]);
        } else if(!error && response.statusCode == 400){
          const errorResponse = JSON.parse(body);
          if(errorResponse.error.type == 'invalid_request_error'){
            console.log('error: ', body);
            res.json(JSON.stringify({
              choices: [{
                text:'Please rephrase your query'
              }]
            }));
          } else {
            res.json(body);
          }
        } else {
          console.log(body);
          res.json('Please try again');
        }
      }
    );
}

module.exports = customModelConnector;