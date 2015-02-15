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
    	var links = [
			{area: "ec", link:""},
			{area: "ib", link:""},
			{area: "pb", link:"https://www.ingress.com/intel?ll=32.791077,3122.712924&z=13"},
			{area: "mmb", link:""}
		];
		var input = hook.text.toLowerCase.split(' ');
		var response = "";
		if (input.length > 1) {
			var command = input[1];
			switch (command) {
				case "help"
					response = "Help text goes here";
				break;
				case "add":
					if (input.lengh >= 4) {
						var newArea = input[2];
						var newLink = input[3];
						response = "Adding " + newArea + " " + newLink;
					}
					else {
						response = "please include an area and link";
					}
				break;
				default:
					response = "Area not found";
					for (var i = 0; i<links.length; i++) {
						if (links[i].area == input[1]) {
							response = links[i].link;
							break;
						}
					}
				break;
			}
			
		}

        return {
            text: "Intel link for area '" + response,
            username: hook.trigger_word
        };
    });
    res.json(reply);
});

module.exports = router;
