const LLM_CONFIG = [
    {
      NAME: 'Open AI',
      VALUE: 'OPEN_AI',
      URL: 'https://api.openai.com/v1/completions',
      API_KEY: '<APP-KEY>',
      MODELS: [
        {
          NAME: 'DAVINCI_003',
          VALUE: 'text-davinci-003',
          LENGTH: 4096
        }
      ]
    }, {
      NAME: 'GOOGLE',
      VALUE: 'GOOGLE',
      URL: '<URL>'
    }, {
      NAME: 'CUSTOM',
      VALUE: 'CUSTOM',
      URL: '<URL>'
    }
  
  ];
  
  function getProviderProperty(provider, property) {
    for(var index in LLM_CONFIG){
      if(provider == LLM_CONFIG[index].VALUE){
        return LLM_CONFIG[index][property];
      }
    }
    return '';
  }
  
function getModelTokenLength(provider, model) {
    for(var index in LLM_CONFIG){
      if(provider == LLM_CONFIG[index].VALUE){
        for(var modelIndex in LLM_CONFIG[index].MODELS){
          if(model == LLM_CONFIG[index].MODELS[modelIndex].VALUE){
            return LLM_CONFIG[index].MODELS[modelIndex].LENGTH;
          }
        }
      }
    }
    return 1000;
  }

  module.exports.LLM_CONFIG = LLM_CONFIG;
  module.exports.getProviderProperty = getProviderProperty;
  module.exports.getModelTokenLength = getModelTokenLength;