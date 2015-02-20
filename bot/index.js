function Bot (token) {

	var Slack = require('slack-client');
	var Commands = require('./commands.js');

	var autoReconnect = true;
	var autoMark = true;

	this.slack = new Slack(token, autoReconnect, autoMark);

	this.slack.on('open', function() {

		var channels = [],
		    groups = [],
		    unreads = this.slack.getUnreadCount(),
		    key;

		for (key in this.slack.channels) {
			if (this.slack.channels[key].is_member) {
				channels.push('#' + this.slack.channels[key].name);
			}
		}

		for (key in this.slack.groups) {
			if (this.slack.groups[key].is_open && !this.slack.groups[key].is_archived) {
				groups.push(this.slack.groups[key].name);
			}
		}

		console.log('Welcome to Slack. You are @%s of %s', this.slack.self.name, this.slack.team.name);
		console.log('You are in: %s', channels.join(', '));
		console.log('As well as: %s', groups.join(', '));
		console.log('You have %s unread ' + (unreads === 1 ? 'message' : 'messages'), unreads);
	}.bind(this));

	this.slack.on('message', function(message) {

		var type = message.type,
		    channel = this.slack.getChannelGroupOrDMByID(message.channel),
		    user = this.slack.getUserByID(message.user),
		    time = message.ts,
		    text = message.text,
		    response = '';
		//console.log('Received: %s %s @%s %s "%s"', type, (channel.is_channel ? '#' : '') + channel.name, user.name, time, text);
		if ((type === 'message') && (text.split(' ')[0] === '<@U03NVF0B2>')) {
			response = Commands.execute(message, channel);
			channel.postMessage(response);
			console.log('@%s responded with "%s"', this.slack.self.name, response);
		}
	}.bind(this));

	this.slack.on('error', function(error) {

		console.error('Error: %s', error);
	}.bind(this));

	this.slack.login();
}

module.exports = Bot;