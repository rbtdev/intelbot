var Messenger = require('../bot/messenger.js');

var messenger = new Messenger();

var message = messenger.createMessage({
		text: "Hello",
		interval: 10,
		cb: function display() {
			console.log("Message: %s", JSON.stringify(this));
		}
	});

var message2 = messenger.createMessage({
		text: "Hello",
		interval: 5,
		cb: function display() {
			console.log("Message: %s", JSON.stringify(this));
		}
	});


setTimeout(
	function () {
		messenger.clearById(message.id)
		console.log("Message cleared.");
	}, 
	30*1000);




