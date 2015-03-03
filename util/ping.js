
exports.start = function (appName, interval) {
	if (appName) {
		interval = interval?interval:45; //mins
		var domain = appName + ".herokuapp.com"
		console.log("Scheduling ping to %s every %s mins.", domain, interval )
		setInterval(function () {
			var http = require('http');
			console.log("ping");
			var options = {
			  host: domain,
			  path: '/ping'
			};

			callback = function(response) {
			  var str = '';
			  response.on('data', function (chunk) {
			    str += chunk;
			  });
			  response.on('end', function () {
			    console.log(str);
			  });
			}
			http.request(options, callback).end();
		}, interval*60*1000);
	}
	else {
		console.log("no app name provided. Ping not scheduled.")
	}
}

