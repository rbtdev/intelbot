var data = require('../data/data');


module.exports = function Messenger() {
	this.messages = [];
	this.create = create;


	function Message(options) {
		this.text = options.text;
		this.channel = options.channel;
		this.repeat = options.repeat;
		this.command = options.command;
	};

	
	function create(message, argv) {
		var options ={};
		options.text = text;
		var message = new Message(options);


	};

	function delete(messageId) {
		var message = this.messages.filter(function(message) {
    		return message.messageId == messageId;
    	}
});
	}
}