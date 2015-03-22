var messenger = require('./messenger.js');

module.exports = function EventManager() {
	var eventList = [];
	this.exec = exec;
	var id = 0;
	console.log("Initialized event manager.  EventList.length = " + eventList.length)

	function Event(options) {
		this.name = options.name;
		this.location = options.location?options.location:"";
		this.time = options.time?options.time:"";
		this.rsvps = [];
		this.id = newId();
		this.active = true;
		this.toString = function () {
			var text = "Name: " + this.name + "\n";
			text += "RSVPS: \n";
			this.rsvps.forEach( function (rsvp) {
				text += rsvp.name + " - " + rsvp.rsvp + "\n";
			});
			return text;
		}
	};

	function geteventList() {
		console.log("Events = " + eventList)
		return eventList.filter(function (event) {
			return (event.active);
		});
	};


	function newId() {
		return id++;
	};

	function findById(eventId) {
		var found = eventList.filter(function(event) {
			return ((event.id == eventId) && (event.active));
		});
		return found.length?found[0]:null;
	};

	function clearById(eventId) {
		var result = false;
		var event = findById(eventId);
		if (event) {
			result = true;
			event.active = false;
		}
		return result
	};

	function rsvp (eventId, rsvp, name) {
		var event = findById(eventId);
		if (event) {
			event.rsvps.push({name: name, rsvp: rsvp});
		}
	}

	function exec(user, args, channel, respond) {
		var command = args._.length?args._[0]:"";
		console.log("Event exec - user = " + user)
		switch (command) {
			case "add":
				console.log("Event List = " + eventList)
				console.log("Event List type = " + typeof(eventList))
				if (args._.length>=2) {
					var name = args._[1];
					options = {name: name};
					var event = new Event(options);
					eventList.push(event);
					respond({text: "Event Added"})
				}
				else {
					respond({text: "Please supply a name."})
				}
			break;
			case "find":
				if (args._.length >=2) {
					var eventId = args._[1]
					var event = findById(eventId);
					if (event) {
						var text = event.toString();
						respond({text: text});
					}
					else {
						respond({text: "No event with id = " + eventId + " found."})
					}
				}
				else {
					respnd({text: "Please provide an Event ID to find"})
				}
			break;
			case "list":
				var text = eventList.length?"Event List: \n":"No eventList.";
				eventList.forEach(function (event) {
					text += event.toString();
				});
				respond({text: text});
			break;
			case "rsvp":
				if (args._.length >= 3) {
					var eventId = args._[1];
					var rsvp = args._[2];
					var event = findById(eventId);
					var text;
					if (event) {
						event.rsvps.push({name: user.name, rsvp: rsvp});
						text =	"RSVP added.";				
					}
					else {
						text = "No event with ID = " + eventId + " found.";
					}
				}
				respond({text: text})
			break;
			case "delete":
				respond({text: "Delete command"})
			break;
			default:
				respond({text: "Invalid command"})
			break;
		}
	};
}
