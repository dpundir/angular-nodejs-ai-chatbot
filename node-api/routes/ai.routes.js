const express = require("express");
const request = require('request');
const modelConfig = require('./../modelConnectors/model.config');
const openAIModelConnector = require('./../modelConnectors/openai.model.connector');
const googleModelConnector = require('./../modelConnectors/google.model.connector');
const customModelConnector = require('./../modelConnectors/custom.model.connector');

const app = express();

const router = express.Router();

router.route("/aiproviders").get((req, res, next) => {
  res.json(modelConfig.LLM_CONFIG);
});

router.route("/aiprovidermodels").get((req, res, next) => {
  for(var index in modelConfig.LLM_CONFIG){
    if(req.query.provider == modelConfig.LLM_CONFIG[index].VALUE){
      res.json(modelConfig.LLM_CONFIG[index].MODELS);
    }
  }
  res.json([]);
});

// query predictions
router.route("/query").post((req, res, next) => {
  var provider = req.body.provider ? req.body.provider : modelConfig.LLM_CONFIG[0].VALUE;
  var model = req.body.model ? req.body.model : modelConfig.LLM_CONFIG[0].MODELS[0].VALUE;
  var text = req.body.message;
  switch(provider){
    case 'OPEN_AI': return openAIModelConnector(req, res, next, provider, model, text);
    case 'GOOGLE': return googleModelConnector(req, res, next, provider, model, text);
    case 'CUSTOM': return customModelConnector(req, res, next, provider, model, text);
  }
});

module.exports = router;
