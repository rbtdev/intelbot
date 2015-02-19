var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var Commands = require('../commands/commands');

var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ingress', function (req,res) {
	var hook = {text: req.param('text')}
	res.json(Commands.execute(hook));
});

router.post('/ingress',function(req,res) {

    var reply = slack.respond(req.body,Commands.process(req));
    res.json(reply);
});

module.exports = router;
