var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var links = require('../data/links')
var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

var parse = function (hook) {
	var text = hook.text.toLowerCase();
	var commandLine = text.substr(text.indexOf(" ") + 1);
	console.log('input = ' + text)

	var input = commandLine.split(' ');
	console.log('array = ' + JSON.stringify(input))
	var response = "Default response";
	var attachments = [];
	if (input.length > 0) {
		var command = input[0];

		switch (command) {
			case "list":
				response = "List of available locations:";
				for (var i = 0; i<links.length; i++) {
					var attachment = {};
					attachment.fallback = links[i].name;
					attachment.text =  "<"+ links[i].intelUrl + "|Intel Map>" + "   <" + links[i].mapsUrl + "|Google Map>";
					attachment.title = links[i].name + " - " + links[i].area;
					attachments.push(attachment);
				}
				
			break;
			case "add":
				response = "Comming soon.";
			break;
			case "find":
				response = "Area not found";
				var searchText = commandLine.substr(commandLine.indexOf(" ") + 1);
				for (var i = 0; i<links.length; i++) {
					var linkText = links[i].name + " " + links[i].area;
					console.log("search for: '" + searchText + "' in '" + linkText);
					if (linkText.toLowerCase().search(searchText) > -1) {
						response = links[i].name;
						var attachment = {};
						attachment.fallback = links[i].name;
						attachment.text = links[i].area;
						attachment.title = "<"+ links[i].intelUrl + "|Intel Map>" + "   <" + links[i].mapsUrl + "|Google Map>";
						attachments.push(attachment);
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
        attachments: attachments
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
