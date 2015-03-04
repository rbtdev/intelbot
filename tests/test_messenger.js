var Messenger = require('../bot/messenger.js');

var messenger = new Messenger();

var message = messenger.createMessage({
		text: "Hello",
		interval: 10,
		cb: function display() {
			console.log("Message: %s", JSON.stringify(this));
		}
	});

