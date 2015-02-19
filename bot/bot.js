var data = require('../data/data');
var str2argv = require('string-argv');
var argvParser = require('minimist');
var Slack = require('node-slack');
var links = data.data;

function Attachment (link) {
	this.fallback = link.name;
	this.text =  "<"+ link.intelUrl + "|Intel Map>" + "   <" + link.mapsUrl + "|Google Map>";
	this.title = link.name + " - " + link.area;
};

function  makeAttachments (links) {
	var attachments = [];
	for (var i=0; i<links.length; i++) {
		attachments.push(new Attachment(links[i]));
	}
	return attachments;
};

function list (args) {
	var response = "List of available locations:";
	var attachments = makeAttachments(data.find());
	return {text: response, attachments: attachments};
};

function add (args) {
	var response = "Coming soon...";
	var attachments = [];
	return {text: response, attachments: attachments};
};

function find (args) {
	var response = "Area not found";
	var searchText = args._.join(' ');
	var attachments = makeAttachments(data.find(searchText));
	if (attachments.length > 0) {
		response = "Results with '" + searchText + "'";
	}
	return {text: response, attachments: attachments};
};

function motd (hook, args) {
	response = "usage: @intel -m 'message text'";
	console.log("args = " + JSON.stringify(args))
	var attachments = [];
	var message = args.m;
	var location = args.l;
	var repeat = args.r;
	var start = args.s;
	var end = args.e;
	var commandStr = "find " + location;
	var argv = str2argv.parseArgsStringToArgv(commandStr);
	var response = find(argvParser(argv.splice(1), {}));
	response.text = message;
	setInterval(sendMotd(hook, response), repeat*1000)
	return response;
};

function sendMotd(hook, response) {
	return function () {
		console.log("response = " + JSON.stringify(response))
		console.log("hook = " + JSON.stringify(hook))
	}
};

function upload (args) {
	response = "Comming soon...";
	attachments = [];
	return {text: response, attachments: attachments};
};

function help (args) {
	var attachments = [];
	response = "Welcome to the Ingress Intel Link Bot (beta)\n";
	response += "The following commands are now available:\n";
	response += "@intel find <name> - searches for the location specified by <name>. Ex: @intel find tony romas\n",
	response += "@intel list - dispays a list of available areas\n";
	response += "Comming soon:\n"
	response += "@intel add <area> <name> <link> - adds an area to the list of available areas. Admins only.\n";
	response += "@intel upload <google spreadsheet url> - bulk adds a list of area entries. Admins only\n"
	response += "Working on displaying a screenshot of the specified area along with the link.";
	return {text: response, attachments: attachments}
};

function parse (hook) {
	var text = hook.text.toLowerCase();
	var argv = str2argv.parseArgsStringToArgv(text).splice(1);
	return {
		verb: argv[0],
		args: argvParser(argv.splice(1), {})
	};
};

function Bot (req) {
	this.req = req;
};

Bot.prototype.execute = function (hook) {
	console.log('headers = ' + JSON.stringify(this.req.headers))
	console.log("hook = " + JSON.stringify(hook))
	var command = parse(hook);
	switch (command.verb) {
		case "list":
			response = list(command.rgs);
		break;
		case "add":
			response = add(command.args);
		break;
		case "find":
			response = find(command.args);
		break;
		case "motd":
			response = motd(hook, command.args);
		break;
		case "upload":
			response = upload(command.args);
		break;
		default:
			response = help(command.args);
		break;
	}
	return response;
};

module.exports = Bot;


