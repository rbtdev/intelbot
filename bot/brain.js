var data = require('../data/data');
var str2argv = require('string-argv');
var argvParser = require('minimist');
var Messenger = require('messenger');

module.exports = function Brain() {
	this.exec = exec;
	this.motdTimer = null;
	this.messenger = new Messenger();

	function Attachment (link) {
		this.fallback = link.name;
		this.text =  "<"+ link.intelUrl + "|Intel Map>" + "   <" + link.mapsUrl + "|Google Map>";
		this.title = link.name + " - " + link.area + " (" + link.shortCode + ")";
	};

	function  makeAttachments (links) {
		var attachments = [];
		if (links) {
			for (var i=0; i<links.length; i++) {
				attachments.push(new Attachment(links[i]));
			}
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

	function add (args, respond) {
		var response = "Coming soon...";
		var attachments = [];
		respond({text: response, attachments: attachments});
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

	function motd (hook, args,channel, respond) {
		clearInterval(this.motdTimer);
		var errorMessage = null;
		console.log("args = " + JSON.stringify(args))
		var attachments = [];
		var message = args.m?args.m:"";
		var location = args.l;
		args.r = args.r?parseInt(args.r):0;
		var repeat = isNaN(args.r)?0:args.r;
		if ((args.r) && (repeat < 10)) {
			respond({text: "Repeat interval must be greater than 10min"});
		}
		else {
			if (repeat) {
				message ="To cancel this message type `@intel motd`\n" + "*" + message + "*";
			}
			var start = args.s;
			var end = args.e;
			if (location) {
				var commandStr = "find " + location;
				var argv = str2argv.parseArgsStringToArgv(commandStr);
				find(argvParser(argv.splice(1)), function (response) {
					response.text = message;
					respond(response);
				});
			}
			else {
				if (message) {
					respond({text: message, attachments: null});
				}
				else {
					respond({text: "Message cleared"})
				}
			}
			if (repeat >= 10) {
				this.motdTimer = setInterval(sendMotd(commandStr, message, channel), repeat*60*1000);
			}
		}
	};

	function sendMotd(commandStr, message, channel) {
		return function () {
			var argv = str2argv.parseArgsStringToArgv(commandStr);
			find(argvParser(argv.splice(1)), function (response) {
				response.text = message;
				console.log("response = " + JSON.stringify(response))
				channel.postMessage(response);
			});
		}
	};

	function upload (hook, respond) {
		console.log("file url: " + hook.file.url_download)
		data.load(hook.file.url_download, function (resp) {
			respond ({text: resp, attachments: null});
		})
	};

	function help (args, respond) {
		var attachments = [];
		response = "*Welcome to the Ingress Intel Link Bot (beta)*\n\n";
		response += "*The following commands are now available*\n";
		response += "`  @intel find <name> - searches for the location specified by <name>. Ex: @intel find tony romas`\n",
		response += "`  @intel list - dispays a list of available areas`\n";
		response += "`  @intel motd -m 'message to send' -r <repeat interval in mins> -l <location>`\n\n";
		response += "*Coming soon*\n"
		response += "`  @intel add <area> <name> <shortCode> <intelLink> <mapsLink> - adds an area to the list of available areas. Admins only.`\n";
		response += "`  @intel upload <google spreadsheet url> - bulk adds a list of area entries. Admins only`\n"
		respond({text: response, attachments: attachments})
	};

	function parse (hook) {
		var argv = str2argv.parseArgsStringToArgv(hook.text).splice(1);
		argv = argv.length?argv:["help"];
		return {
			verb: argv[0],
			args: argvParser(argv.splice(1), {})
		};
	};

	function exec (hook, channel, respond) {
		console.log("hook = " + JSON.stringify(hook))
		//data.load("https://docs.google.com/spreadsheets/d/1GI580TI29HL05Omegqb-HqHczU9sAY5XAgY9G-h9Eqs/pubhtml")
		var command = parse(hook);
		switch (command.verb.toLowerCase()) {
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
				motd(hook, command.args, channel, respond);
			break;
			case "upload":
				upload(hook, respond);
			break;
			default:
				help(command.args, respond);
			break;
		}
	};


};
