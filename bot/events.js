var messenger = require('./messenger.js');

module.exports = function EventManager() {
	this.exec = exec;
	var events = [];
	var id = 0;

	function newId() {
		return id++;
	};

	function exec(args, channel, respond) {
		var command = args._.length?args._[0]:"";
		switch (command) {
			case "add":
				respond({text: "Add command"})
			break;
			case "list":
				respond({text: "List command"})
			break;
			case "rsvp":
				respond({text: "RSVP command"})
			break;
			case "delete":
				respond({text: "Delete command"})
			break;
			default:
				respond({text: "Invalid command"})
			break;
		}
	};

	function add(options) {

	};

	function rsvp(options) {

	};

	function list() {

	};

	function remove(eventId) {

	};

}
