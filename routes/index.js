var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var Commands = require('../commands/commands');

var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

var processHook = function (hook) {
	var command = Commands.parse(hook);
	var response = Commands.execute(command);
    return response;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ingress', function (req,res) {
	console.log('processing command...');
	var hook = {text: req.param('text')}
	res.json(processHook(hook));
});

router.post('/ingress',function(req,res) {
    var reply = slack.respond(req.body,processHook);
    res.json(reply);
});

module.exports = router;
