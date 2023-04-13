const request = require('request');
const modelConfig = require('./../modelConnectors/model.config');

function openAIModelConnector(req, res, next, provider, model, text) {    
  var messageSize = text? text.length : 0;
  var query = {
    model : model,
    temperature : 0,
    prompt: text,
    max_tokens: modelConfig.getModelTokenLength(provider, model) - messageSize
  }
  console.log('query: ', query);

  return request.post({
    url: modelConfig.getProviderProperty(provider, 'URL'),
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + modelConfig.getProviderProperty(provider, 'API_KEY')
    }, 
    body: JSON.stringify(query)}
    , 
    function(error, response, body){
      if (!error && response.statusCode == 200) {
        const responseBody = JSON.parse(body);
        console.log('answer: ', responseBody.choices[0].text);
        res.json(responseBody.choices[0].text);
      } else if(!error && response.statusCode == 400){
        const errorResponse = JSON.parse(body);
        if(errorResponse.error.type == 'invalid_request_error'){
          console.log('error: ', body);
          res.json('Please rephrase your query');
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

module.exports = openAIModelConnector;