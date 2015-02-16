var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

var parse = function (hook) {
	var text = hook.text;
	var commandLine = text.substr(text.indexOf(" ") + 1);
	console.log('input = ' + text)
	var links = [
		{area: "ec", name: "El Cajon", link:"https://www.ingress.com/intel?ll=32.794636,-116.962298&z=15"},
		{area: "ib", name: "Imperial Beach", link:"https://www.ingress.com/intel?ll=32.579815,-117.117755&z=15"},
		{area: "pb", name: "Pacific Beach", link:"https://www.ingress.com/intel?ll=32.797829,-117.242793&z=14"},
		{area: "mmb", name: "Mira Mesa Blvd", link:"https://www.ingress.com/intel?ll=32.907638,-117.153504&z=14"},
		{area: "gdp", name: "Grape Day Park", link:"https://www.ingress.com/intel?ll=33.12255,-117.085275&z=17"}
	];
	var input = commandLine.toLowerCase().split(' ');
	console.log('array = ' + JSON.stringify(input))
	var response = "Default response";
	if (input.length > 0) {
		var command = input[0];

		switch (command) {
			case "list":
				response = "";
				for (var i = 0; i<links.length; i++) {
					response += links[i].area.toUpperCase() + " - " + "<"+ links[i].link + "|" + links[i].name  + ">\n"
				}
			break;
			case "add":
				if (input.length >= 4) {
					var newArea = input[2];
					var newLink = input[3];
					response = "Adding " + newArea + " " + newLink;
				}
				else {
					response = "Please include an area and link";
				}
			break;
			case "find":
				response = "Area not found";
				var area = commandLine.substr(commandLine.indexOf(" ") + 1);
				for (var i = 0; i<links.length; i++) {
					if (links[i].area == area) {
						response = links[i].link;
						break;
					}
				}
			break;
			default:
				response = "Welcome to the Ingress Intel Link Bot (beta)\n";
				response += "The following commands are now available:\n";
				response += "@intel find <name> - searches for the location specified by <name>. Ex: @intel find tony romas\n",
				response += "@intel list - dispays a list of available areas\n";
				response += "Comming soon:\n"
				response += "@intel add <area> <name> <link> - adds an area to the list of available areas. Admins only.\n";
				response += "@intel upload <google spreadsheet url> - bulk adds a list of area entries. Admins only\n"
				response += "Working on displaying a screenshot of the specified area along with the link.";
			break;
		}
		
	}

    return {
        text: response,
        //username: hook.trigger_word
    };
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ingress', function (req,res) {
	console.log('processing command...');
	var hook = {text: req.param('text')}
	var reply = parse(hook);
	res.json(reply);
});

router.post('/ingress',function(req,res) {
    var reply = slack.respond(req.body,parse);
    res.json(reply);
});

module.exports = router;
