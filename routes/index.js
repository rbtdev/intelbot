var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var data = require('../data/links')
var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

var links = data.data

var Attachment = function (link) {
	this.fallback = links[i].name;
	this.text =  "<"+ links[i].intelUrl + "|Intel Map>" + "   <" + links[i].mapsUrl + "|Google Map>";
	this.title = links[i].name + " - " + links[i].area;
};



var processHook = function (hook) {
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
				attachments = data.find(links, null);
			break;
			case "add":
				response = "Comming soon.";
			break;
			case "find":
				response = "Area not found";
				var searchText = commandLine.substr(commandLine.indexOf(" ") + 1);
				attachments = data.find(links, searchText);
				if (attachments.length > 0) {
					response = "Results with '" + searchText + "'";
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
    var reply = slack.respond(req.body,processHook);
    res.json(reply);
});

module.exports = router;
