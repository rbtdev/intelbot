var data = require('../data/data');
var str2argv = require('string-argv');
var argvParser = require('minimist');
var links = data.data;

function Attachment (link) {
	this.fallback = link.name;
	this.text =  "<"+ link.intelUrl + "|Intel Map>" + "   <" + link.mapsUrl + "|Google Map>";
	this.title = link.name + " - " + link.area + " (" + link.shortCode + ")";
};

function  makeAttachments (links) {
	var attachments = [];
	for (var i=0; i<links.length; i++) {
		attachments.push(new Attachment(links[i]));
	}
	return attachments;
};

function list (args, respond) {
	var response = "List of available locations:";
	data.find(null, function (links) {
		var attachments = makeAttachments(links);
		respond({text: response, attachments: attachments});
	});
};

function add (args) {
	var response = "Coming soon...";
	var attachments = [];
	return {text: response, attachments: attachments};
};

function find (args, respond) {
	var response = "Area not found";
	var searchText = args._.join(' ');
	data.find(searchText, function (links) {
		var attachments = makeAttachments(links);
		if (attachments.length > 0) {
			response = "Results with '" + searchText + "'";
		}
		respond({text: response, attachments: attachments});
	});
};

function motd (hook, args,channel) {
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
	setInterval(sendMotd(commandStr, message, channel), repeat*60*1000)
	return response;
};

function sendMotd(commandStr, message, channel) {
	return function () {
		var argv = str2argv.parseArgsStringToArgv(commandStr);
		var response = find(argvParser(argv.splice(1), {}));
		response.text = message;
		console.log("response = " + JSON.stringify(response))
		channel.postMessage(response);
	}
};

function upload (args) {
	response = "Comming soon...";
	attachments = [];
	return {text: response, attachments: attachments};
};

function help (args, respond) {
	var attachments = [];
	response = "Welcome to the Ingress Intel Link Bot (beta)\n";
	response += "The following commands are now available:\n";
	response += "@intel find <name> - searches for the location specified by <name>. Ex: @intel find tony romas\n",
	response += "@intel list - dispays a list of available areas\n";
	response += "Comming soon:\n"
	response += "@intel add <area> <name> <link> - adds an area to the list of available areas. Admins only.\n";
	response += "@intel upload <google spreadsheet url> - bulk adds a list of area entries. Admins only\n"
	response += "Working on displaying a screenshot of the specified area along with the link.";
	respond({text: response, attachments: attachments})
};

function parse (hook) {
	var text = hook.text.toLowerCase();
	var argv = str2argv.parseArgsStringToArgv(text).splice(1);
	return {
		verb: argv[0],
		args: argvParser(argv.splice(1), {})
	};
};

exports.execute  = function (hook, channel, respond) {
	console.log("hook = " + JSON.stringify(hook))
	//data.load("https://docs.google.com/spreadsheets/d/1GI580TI29HL05Omegqb-HqHczU9sAY5XAgY9G-h9Eqs/pubhtml")
	var command = parse(hook);
	switch (command.verb) {
		case "list":
			list(command.args, respond);
		break;
		case "add":
			response = add(command.args);
		break;
		case "find":
			find(command.args, respond);
		break;
		case "motd":
			response = motd(hook, command.args, channel);
		break;
		case "upload":
			response = upload(command.args);
		break;
		default:
			help(command.args, respond);
		break;
	}
};



