
exports.start = function (appName, interval) {
	if (appName) {
		interval = interval?interval:45; //mins
		console.log("Scheduling ping every " + interval + " mins.")
		setInterval(function () {
			var http = require('http');
			console.log("ping...");
			//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
			var options = {
			  host: appName + ".heroku.com",
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
		console.log("no app host domain provided for ping.")
	}
}

