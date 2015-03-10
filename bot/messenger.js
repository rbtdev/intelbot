module.exports = function Messenger() {
	var messages = [];
	var id = 0;
	this.createMessage = createMessage;
	this.messages = getMessages;
	this.findById = findById;
	this.clearById = clearById;


	function newId() {
		return id++;
	};

	function Message(options) {
		this.text = options.text;
		this.id = newId();
		this.interval = options.interval;
		this.channel = options.channel;
		this.command = options.command;
		this.cb = options.cb;
		if (this.cb && this.interval > 1) {
			this.timer = setInterval(this.cb.bind(this), this.interval*1000);
		}
	};

	function createMessage(options) {
		var message = new Message(options);
		messages.push(message);
		return message;
	};

	function getMessages() {
		return messages;
	};

	function findById(messageId) {
		var found = messages.filter(function(message) {
    		return message.id == messageId;
    	});
    	return found.length?found[0]:null;
	};

	function clearById(messageId) {
		var message = findById(messageId);
		clearInterval(message.timer);
	}
}