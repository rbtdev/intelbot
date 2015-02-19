var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var Bot = require('../bot/bot');

var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ingress', function (req,res) {
	var hook = {text: req.param('text')}
	var bot = new Bot(req);
	res.json(bot.execute(hook));
});

router.post('/ingress',function(req,res) {
	var bot = new Bot(req);
    var reply = slack.respond(req.body,bot.execute);
    res.json(reply);
});

module.exports = router;
