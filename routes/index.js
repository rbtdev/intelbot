var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ingress', function (req,res) {
	res.send('Ingress Bot is listening...');
});

router.post('/ingress',function(req,res) {
    var reply = slack.respond(req.body,function(hook) {
        return {
            text: 'Good point, ' + hook.user_name,
            username: 'Bot'
        };
    });
    res.json(reply);
});

module.exports = router;
