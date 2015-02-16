var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var slack = new Slack("rbtdev.slack.com","0h7pWGuvbTDZGaO3pRNBcSKP");

var parse = function (hook) {
	var text = hook.text;
	var commandLine = text.substr(text.indexOf(" ") + 1);
	console.log('input = ' + text)
var links =[
  {
    "name":"International Houses",
    "area":"Balboa Park",
    "intelUrl":"https://www.ingress.com/intel?ll=32.729398,-117.151563&z=17&pll=32.729398,-117.151563",
    "mapsUrl":"http://maps.google.com/?q=International Houses@32.729398,-117.151563"
  },
  {
    "name":"Chicano Park",
    "area":"Barrio Logan",
    "intelUrl":"https://www.ingress.com/intel?ll=32.699771,-117.143668&z=17&pll=32.699771,-117.143668",
    "mapsUrl":"http://maps.google.com/?q=Chicano Park@32.699771,-117.143668"
  },
  {
    "name":"Southwestern College",
    "area":"Chula Vista",
    "intelUrl":"https://www.ingress.com/intel?ll=32.642248,-116.99532&z=17&pll=32.642248,-116.99532",
    "mapsUrl":"http://maps.google.com/?q=Southwestern College@32.642248,-116.99532"
  },
  {
    "name":"Mountain Hawk Park",
    "area":"Chula Vista",
    "intelUrl":"https://www.ingress.com/intel?ll=32.635697,-116.934183&z=17&pll=32.635697,-116.934183",
    "mapsUrl":"http://maps.google.com/?q=Mountain Hawk Park@32.635697,-116.934183"
  },
  {
    "name":"CTS",
    "area":"Clairemont",
    "intelUrl":"https://www.ingress.com/intel?ll=32.829527,-117.205048&z=17&pll=32.829527,-117.205048",
    "mapsUrl":"http://maps.google.com/?q=CTS@32.829527,-117.205048"
  },
  {
    "name":"Seaport Village",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.709443,-117.17168&z=17&pll=32.709443,-117.17168",
    "mapsUrl":"http://maps.google.com/?q=Seaport Village@32.709443,-117.17168"
  },
  {
    "name":"4th and Island",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.7105,-117.161166&z=17&pll=32.7105,-117.161166",
    "mapsUrl":"http://maps.google.com/?q=4th and Island@32.7105,-117.161166"
  },
  {
    "name":"Silo",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.713562,-117.150204&z=17&pll=32.713562,-117.150204",
    "mapsUrl":"http://maps.google.com/?q=Silo@32.713562,-117.150204"
  },
  {
    "name":"Children's Museum",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.710038,-117.164841&z=17&pll=32.710038,-117.164841",
    "mapsUrl":"http://maps.google.com/?q=Children's Museum@32.710038,-117.164841"
  },
  {
    "name":"EC Alley",
    "area":"El Cajon",
    "intelUrl":"https://www.ingress.com/intel?ll=32.795366,-116.962066&z=17&pll=32.795366,-116.962066",
    "mapsUrl":"http://maps.google.com/?q=EC Alley@32.795366,-116.962066"
  },
  {
    "name":"Grape Day Park",
    "area":"Escondido ",
    "intelUrl":"https://www.ingress.com/intel?ll=33.1244,-117.083124&z=17&pll=33.1244,-117.083124",
    "mapsUrl":"http://maps.google.com/?q=Grape Day Park@33.1244,-117.083124"
  },
  {
    "name":"Veteran's  Park",
    "area":"Imperial Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.577669,-117.116201&z=17&pll=32.577669,-117.116201",
    "mapsUrl":"http://maps.google.com/?q=Veteran's  Park@32.577669,-117.116201"
  },
  {
    "name":"Mt Soledad",
    "area":"La Jolla",
    "intelUrl":"https://www.ingress.com/intel?ll=32.839171,-117.247314&z=17&pll=32.839171,-117.247314",
    "mapsUrl":"http://maps.google.com/?q=Mt Soledad@32.839171,-117.247314"
  },
  {
    "name":"La Jolla",
    "area":"La Jolla",
    "intelUrl":"https://www.ingress.com/intel?ll=32.847296,-117.272392&z=17&pll=32.847296,-117.272392",
    "mapsUrl":"http://maps.google.com/?q=La Jolla@32.847296,-117.272392"
  },
  {
    "name":"Downtown La Mesa",
    "area":"La Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.764666,-117.020002&z=17&pll=32.764666,-117.020002",
    "mapsUrl":"http://maps.google.com/?q=Downtown La Mesa@32.764666,-117.020002"
  },
  {
    "name":"Mt Helix",
    "area":"La Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.767029,-116.983327&z=17&pll=32.767029,-116.983327",
    "mapsUrl":"http://maps.google.com/?q=Mt Helix@32.767029,-116.983327"
  },
  {
    "name":"Briarcrest Park",
    "area":"La Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.780925,-117.001979&z=17&pll=32.780925,-117.001979",
    "mapsUrl":"http://maps.google.com/?q=Briarcrest Park@32.780925,-117.001979"
  },
  {
    "name":"Spring Valley Park",
    "area":"La Presa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.707403,-117.00715&z=17&pll=32.707403,-117.00715",
    "mapsUrl":"http://maps.google.com/?q=Spring Valley Park@32.707403,-117.00715"
  },
  {
    "name":"Parsonage Museum ",
    "area":"Lemon Grove",
    "intelUrl":"https://www.ingress.com/intel?ll=32.739731,-117.031944&z=17&pll=32.739731,-117.031944",
    "mapsUrl":"http://maps.google.com/?q=Parsonage Museum @32.739731,-117.031944"
  },
  {
    "name":"Hillcrest",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.749755,-117.160545&z=17&pll=32.749755,-117.160545",
    "mapsUrl":"http://maps.google.com/?q=Hillcrest@32.749755,-117.160545"
  },
  {
    "name":"Park and Adams ",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.762364,-117.146146&z=17&pll=32.762364,-117.146146",
    "mapsUrl":"http://maps.google.com/?q=Park and Adams @32.762364,-117.146146"
  },
  {
    "name":"Fairmount Park",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.720106,-117.109993&z=17&pll=32.720106,-117.109993",
    "mapsUrl":"http://maps.google.com/?q=Fairmount Park@32.720106,-117.109993"
  },
  {
    "name":"Kensington Park",
    "area":"MidCity ",
    "intelUrl":"https://www.ingress.com/intel?ll=32.763098,-117.106855&z=17&pll=32.763098,-117.106855",
    "mapsUrl":"http://maps.google.com/?q=Kensington Park@32.763098,-117.106855"
  },
  {
    "name":"SDSU",
    "area":"MidCity ",
    "intelUrl":"https://www.ingress.com/intel?ll=32.774791,-117.069442&z=17&pll=32.774791,-117.069442",
    "mapsUrl":"http://maps.google.com/?q=SDSU@32.774791,-117.069442"
  },
  {
    "name":"Pioneer Park",
    "area":"MidCity ",
    "intelUrl":"https://www.ingress.com/intel?ll=32.749086,-117.17814&z=17&pll=32.749086,-117.17814",
    "mapsUrl":"http://maps.google.com/?q=Pioneer Park@32.749086,-117.17814"
  },
  {
    "name":"Holy Spirit Church",
    "area":"MidCity ",
    "intelUrl":"https://www.ingress.com/intel?ll=32.734392,-117.077209&z=17&pll=32.734392,-117.077209",
    "mapsUrl":"http://maps.google.com/?q=Holy Spirit Church@32.734392,-117.077209"
  },
  {
    "name":"Mira Mesa Blvd",
    "area":"Mira Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.912842,-117.145457&z=17&pll=32.912842,-117.145457",
    "mapsUrl":"http://maps.google.com/?q=Mira Mesa Blvd@32.912842,-117.145457"
  },
  {
    "name":"Mission Valley",
    "area":"Mission Valley",
    "intelUrl":"https://www.ingress.com/intel?ll=32.763281,-117.168437&z=17&pll=32.763281,-117.168437",
    "mapsUrl":"http://maps.google.com/?q=Mission Valley@32.763281,-117.168437"
  },
  {
    "name":"Dog Park",
    "area":"Ocean Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.754299,-117.251484&z=17&pll=32.754299,-117.251484",
    "mapsUrl":"http://maps.google.com/?q=Dog Park@32.754299,-117.251484"
  },
  {
    "name":"Old Town",
    "area":"Old Town",
    "intelUrl":"https://www.ingress.com/intel?ll=32.754574,-117.197168&z=17&pll=32.754574,-117.197168",
    "mapsUrl":"http://maps.google.com/?q=Old Town@32.754574,-117.197168"
  },
  {
    "name":"Tony Romas ",
    "area":"Pacific Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.791029,-117.253911&z=17&pll=32.791029,-117.253911",
    "mapsUrl":"http://maps.google.com/?q=Tony Romas @32.791029,-117.253911"
  },
  {
    "name":"Cass St",
    "area":"Pacific Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.797215,-117.251881&z=17&pll=32.797215,-117.251881",
    "mapsUrl":"http://maps.google.com/?q=Cass St@32.797215,-117.251881"
  },
  {
    "name":"Old Poway Park",
    "area":"Poway",
    "intelUrl":"https://www.ingress.com/intel?ll=32.969927,-117.037023&z=17&pll=32.969927,-117.037023",
    "mapsUrl":"http://maps.google.com/?q=Old Poway Park@32.969927,-117.037023"
  },
  {
    "name":"Cuyamaca College",
    "area":"Rancho SD",
    "intelUrl":"https://www.ingress.com/intel?ll=32.743962,-116.943375&z=17&pll=32.743962,-116.943375",
    "mapsUrl":"http://maps.google.com/?q=Cuyamaca College@32.743962,-116.943375"
  },
  {
    "name":"Balboa Park",
    "area":"San Diego",
    "intelUrl":"https://www.ingress.com/intel?ll=32.731345,-117.151084&z=17&pll=32.731345,-117.151084",
    "mapsUrl":"http://maps.google.com/?q=Balboa Park@32.731345,-117.151084"
  },
  {
    "name":"San Diego Zoo",
    "area":"San Diego",
    "intelUrl":"https://www.ingress.com/intel?ll=32.735411,-117.148812&z=17&pll=32.735411,-117.148812",
    "mapsUrl":"http://maps.google.com/?q=San Diego Zoo@32.735411,-117.148812"
  },
  {
    "name":"Santee Town Center",
    "area":"Santee",
    "intelUrl":"https://www.ingress.com/intel?ll=32.842086,-116.981562&z=17&pll=32.842086,-116.981562",
    "mapsUrl":""
  },
  {
    "name":"Hamilton's Cluster",
    "area":"South Park",
    "intelUrl":"https://www.ingress.com/intel?ll=32.721708,-117.13011&z=17&pll=32.721708,-117.13011",
    "mapsUrl":"http://maps.google.com/?q=Hamilton's Cluster@32.721708,-117.13011"
  },
  {
    "name":"Station Cluster",
    "area":"South Park ",
    "intelUrl":"https://www.ingress.com/intel?ll=32.728719,-117.129717&z=17&pll=32.728719,-117.129717",
    "mapsUrl":"http://maps.google.com/?q=Station Cluster@32.728719,-117.129717"
  },
  {
    "name":"Vista Village",
    "area":"Vista",
    "intelUrl":"https://www.ingress.com/intel?ll=33.202468,-117.241979&z=17&pll=33.202468,-117.241979",
    "mapsUrl":"http://maps.google.com/?q=Vista Village@33.202468,-117.241979"
  }
];
	var input = commandLine.toLowerCase().split(' ');
	console.log('array = ' + JSON.stringify(input))
	var response = "Default response";
	if (input.length > 0) {
		var command = input[0];

		switch (command) {
			case "list":
				response = "";
				for (var i = 0; i<links.length; i++) {
					response += links[i].name.toUpperCase() + " - " + "<"+ links[i].intelUrl + "|" + links[i].name  + ">\n"
				}
			break;
			case "add":
				response = "Comming soon.";
			break;
			case "find":
				response = "Area not found";
				var name = commandLine.substr(commandLine.indexOf(" ") + 1);
				for (var i = 0; i<links.length; i++) {
					if (links[i].name == area) {
						response = links[i].intelUrl;
						break;
					}
				}
			break;
			default:
				response = "Welcome to the Ingress Intel Link Bot (beta)\n";
				response += "The following commands are now available:\n";
				response += "@intel find <name> - searches for the location specified by <name>. Ex: @intel find tony romas\n",
				response += "@intel list - dispays a list of available areas\n";
				response += "Comming soon:\n"
				response += "@intel add <area> <name> <link> - adds an area to the list of available areas. Admins only.\n";
				response += "@intel upload <google spreadsheet url> - bulk adds a list of area entries. Admins only\n"
				response += "Working on displaying a screenshot of the specified area along with the link.";
			break;
		}
		
	}

    return {
        text: response,
        //username: hook.trigger_word
    };
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ingress', function (req,res) {
	console.log('processing command...');
	var hook = {text: req.param('text')}
	var reply = parse(hook);
	res.json(reply);
});

router.post('/ingress',function(req,res) {
    var reply = slack.respond(req.body,parse);
    res.json(reply);
});

module.exports = router;
