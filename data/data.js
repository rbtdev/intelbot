module.exports = {
  find: find,
  load: load
}

function find (searchText) {
  var items = [];
  for (var i = 0; i<links.length; i++) {
    var linkText = links[i].name + " " + links[i].area + " " + links[i].shortCode;
    if (searchText) {
      if (linkText.toLowerCase().search(searchText) > -1) {
        items.push(links[i]);
      }
    }
    else {
      items.push(links[i]);     
    }
  }
  return items;
};

function load (url) {
  var Tabletop = require('tabletop');

  Tabletop.init( { key: url,
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } )
};

var links =[
  {
    "name":"International Houses",
    "area":"Balboa Park",
    "intelUrl":"https://www.ingress.com/intel?ll=32.729398,-117.151563&z=17&pll=32.729398,-117.151563",
    "mapsUrl":"http://maps.google.com/?q=International Houses@32.729398,-117.151563",
    "shortCode":"BP"
  },
  {
    "name":"Chicano Park",
    "area":"Barrio Logan",
    "intelUrl":"https://www.ingress.com/intel?ll=32.699771,-117.143668&z=17&pll=32.699771,-117.143668",
    "mapsUrl":"http://maps.google.com/?q=Chicano Park@32.699771,-117.143668",
    "shortCode":"CP"
  },
  {
    "name":"Southwestern College",
    "area":"Chula Vista",
    "intelUrl":"https://www.ingress.com/intel?ll=32.642248,-116.99532&z=17&pll=32.642248,-116.99532",
    "mapsUrl":"http://maps.google.com/?q=Southwestern College@32.642248,-116.99532",
    "shortCode":"CV"
  },
  {
    "name":"Mountain Hawk Park",
    "area":"Chula Vista",
    "intelUrl":"https://www.ingress.com/intel?ll=32.635697,-116.934183&z=17&pll=32.635697,-116.934183",
    "mapsUrl":"http://maps.google.com/?q=Mountain Hawk Park@32.635697,-116.934183",
    "shortCode":"CV"
  },
  {
    "name":"CTS",
    "area":"Clairemont",
    "intelUrl":"https://www.ingress.com/intel?ll=32.829527,-117.205048&z=17&pll=32.829527,-117.205048",
    "mapsUrl":"http://maps.google.com/?q=CTS@32.829527,-117.205048",
    "shortCode":"CTS"
  },
  {
    "name":"Seaport Village",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.709443,-117.17168&z=17&pll=32.709443,-117.17168",
    "mapsUrl":"http://maps.google.com/?q=Seaport Village@32.709443,-117.17168",
    "shortCode":"DT"
  },
  {
    "name":"4th and Island",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.7105,-117.161166&z=17&pll=32.7105,-117.161166",
    "mapsUrl":"http://maps.google.com/?q=4th and Island@32.7105,-117.161166",
    "shortCode":"DT"
  },
  {
    "name":"Silo",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.713562,-117.150204&z=17&pll=32.713562,-117.150204",
    "mapsUrl":"http://maps.google.com/?q=Silo@32.713562,-117.150204",
    "shortCode":"DT"
  },
  {
    "name":"Children's Museum",
    "area":"Downtown",
    "intelUrl":"https://www.ingress.com/intel?ll=32.710038,-117.164841&z=17&pll=32.710038,-117.164841",
    "mapsUrl":"http://maps.google.com/?q=Children's Museum@32.710038,-117.164841",
    "shortCode":"DT"
  },
  {
    "name":"EC Alley",
    "area":"El Cajon",
    "intelUrl":"https://www.ingress.com/intel?ll=32.795366,-116.962066&z=17&pll=32.795366,-116.962066",
    "mapsUrl":"http://maps.google.com/?q=EC Alley@32.795366,-116.962066",
    "shortCode":"EC"
  },
  {
    "name":"Grape Day Park",
    "area":"Escondido ",
    "intelUrl":"https://www.ingress.com/intel?ll=33.1244,-117.083124&z=17&pll=33.1244,-117.083124",
    "mapsUrl":"http://maps.google.com/?q=Grape Day Park@33.1244,-117.083124",
    "shortCode":"GDP"
  },
  {
    "name":"Veteran's  Park",
    "area":"Imperial Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.577669,-117.116201&z=17&pll=32.577669,-117.116201",
    "mapsUrl":"http://maps.google.com/?q=Veteran's  Park@32.577669,-117.116201",
    "shortCode":"IB"
  },
  {
    "name":"Mt Soledad",
    "area":"La Jolla",
    "intelUrl":"https://www.ingress.com/intel?ll=32.839171,-117.247314&z=17&pll=32.839171,-117.247314",
    "mapsUrl":"http://maps.google.com/?q=Mt Soledad@32.839171,-117.247314",
    "shortCode":"LJ"
  },
  {
    "name":"La Jolla",
    "area":"La Jolla",
    "intelUrl":"https://www.ingress.com/intel?ll=32.847296,-117.272392&z=17&pll=32.847296,-117.272392",
    "mapsUrl":"http://maps.google.com/?q=La Jolla@32.847296,-117.272392",
    "shortCode":"LJ"
  },
  {
    "name":"Downtown La Mesa",
    "area":"La Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.764666,-117.020002&z=17&pll=32.764666,-117.020002",
    "mapsUrl":"http://maps.google.com/?q=Downtown La Mesa@32.764666,-117.020002",
    "shortCode":""
  },
  {
    "name":"Mt Helix",
    "area":"La Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.767029,-116.983327&z=17&pll=32.767029,-116.983327",
    "mapsUrl":"http://maps.google.com/?q=Mt Helix@32.767029,-116.983327",
    "shortCode":""
  },
  {
    "name":"Briarcrest Park",
    "area":"La Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.780925,-117.001979&z=17&pll=32.780925,-117.001979",
    "mapsUrl":"http://maps.google.com/?q=Briarcrest Park@32.780925,-117.001979",
    "shortCode":""
  },
  {
    "name":"Spring Valley Park",
    "area":"La Presa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.707403,-117.00715&z=17&pll=32.707403,-117.00715",
    "mapsUrl":"http://maps.google.com/?q=Spring Valley Park@32.707403,-117.00715",
    "shortCode":"SVP"
  },
  {
    "name":"Parsonage Museum ",
    "area":"Lemon Grove",
    "intelUrl":"https://www.ingress.com/intel?ll=32.739731,-117.031944&z=17&pll=32.739731,-117.031944",
    "mapsUrl":"http://maps.google.com/?q=Parsonage Museum @32.739731,-117.031944",
    "shortCode":""
  },
  {
    "name":"Hillcrest",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.749755,-117.160545&z=17&pll=32.749755,-117.160545",
    "mapsUrl":"http://maps.google.com/?q=Hillcrest@32.749755,-117.160545",
    "shortCode":"MC"
  },
  {
    "name":"Park and Adams ",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.762364,-117.146146&z=17&pll=32.762364,-117.146146",
    "mapsUrl":"http://maps.google.com/?q=Park and Adams @32.762364,-117.146146",
    "shortCode":"MC"
  },
  {
    "name":"Fairmount Park",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.720106,-117.109993&z=17&pll=32.720106,-117.109993",
    "mapsUrl":"http://maps.google.com/?q=Fairmount Park@32.720106,-117.109993",
    "shortCode":"MC"
  },
  {
    "name":"Kensington Park",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.763098,-117.106855&z=17&pll=32.763098,-117.106855",
    "mapsUrl":"http://maps.google.com/?q=Kensington Park@32.763098,-117.106855",
    "shortCode":"MC"
  },
  {
    "name":"SDSU",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.774791,-117.069442&z=17&pll=32.774791,-117.069442",
    "mapsUrl":"http://maps.google.com/?q=SDSU@32.774791,-117.069442",
    "shortCode":"MC"
  },
  {
    "name":"Pioneer Park",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.749086,-117.17814&z=17&pll=32.749086,-117.17814",
    "mapsUrl":"http://maps.google.com/?q=Pioneer Park@32.749086,-117.17814",
    "shortCode":"MC"
  },
  {
    "name":"Holy Spirit Church",
    "area":"Mid City",
    "intelUrl":"https://www.ingress.com/intel?ll=32.734392,-117.077209&z=17&pll=32.734392,-117.077209",
    "mapsUrl":"http://maps.google.com/?q=Holy Spirit Church@32.734392,-117.077209",
    "shortCode":"MC"
  },
  {
    "name":"Mira Mesa Blvd",
    "area":"Mira Mesa",
    "intelUrl":"https://www.ingress.com/intel?ll=32.912842,-117.145457&z=17&pll=32.912842,-117.145457",
    "mapsUrl":"http://maps.google.com/?q=Mira Mesa Blvd@32.912842,-117.145457",
    "shortCode":"MMB"
  },
  {
    "name":"Mission Valley",
    "area":"Mission Valley",
    "intelUrl":"https://www.ingress.com/intel?ll=32.763281,-117.168437&z=17&pll=32.763281,-117.168437",
    "mapsUrl":"http://maps.google.com/?q=Mission Valley@32.763281,-117.168437",
    "shortCode":""
  },
  {
    "name":"Dog Park",
    "area":"Ocean Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.754299,-117.251484&z=17&pll=32.754299,-117.251484",
    "mapsUrl":"http://maps.google.com/?q=Dog Park@32.754299,-117.251484",
    "shortCode":"OB"
  },
  {
    "name":"Old Town",
    "area":"Old Town",
    "intelUrl":"https://www.ingress.com/intel?ll=32.754574,-117.197168&z=17&pll=32.754574,-117.197168",
    "mapsUrl":"http://maps.google.com/?q=Old Town@32.754574,-117.197168",
    "shortCode":""
  },
  {
    "name":"Tony Romas ",
    "area":"Pacific Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.791029,-117.253911&z=17&pll=32.791029,-117.253911",
    "mapsUrl":"http://maps.google.com/?q=Tony Romas @32.791029,-117.253911",
    "shortCode":"PB"
  },
  {
    "name":"Cass St",
    "area":"Pacific Beach",
    "intelUrl":"https://www.ingress.com/intel?ll=32.797215,-117.251881&z=17&pll=32.797215,-117.251881",
    "mapsUrl":"http://maps.google.com/?q=Cass St@32.797215,-117.251881",
    "shortCode":"PB"
  },
  {
    "name":"Old Poway Park",
    "area":"Poway",
    "intelUrl":"https://www.ingress.com/intel?ll=32.969927,-117.037023&z=17&pll=32.969927,-117.037023",
    "mapsUrl":"http://maps.google.com/?q=Old Poway Park@32.969927,-117.037023",
    "shortCode":"OPP"
  },
  {
    "name":"Cuyamaca College",
    "area":"Rancho SD",
    "intelUrl":"https://www.ingress.com/intel?ll=32.743962,-116.943375&z=17&pll=32.743962,-116.943375",
    "mapsUrl":"http://maps.google.com/?q=Cuyamaca College@32.743962,-116.943375",
    "shortCode":""
  },
  {
    "name":"Balboa Park",
    "area":"San Diego",
    "intelUrl":"https://www.ingress.com/intel?ll=32.731345,-117.151084&z=17&pll=32.731345,-117.151084",
    "mapsUrl":"http://maps.google.com/?q=Balboa Park@32.731345,-117.151084",
    "shortCode":"BP"
  },
  {
    "name":"San Diego Zoo",
    "area":"San Diego",
    "intelUrl":"https://www.ingress.com/intel?ll=32.735411,-117.148812&z=17&pll=32.735411,-117.148812",
    "mapsUrl":"http://maps.google.com/?q=San Diego Zoo@32.735411,-117.148812",
    "shortCode":""
  },
  {
    "name":"Santee Town Center",
    "area":"Santee",
    "intelUrl":"https://www.ingress.com/intel?ll=32.842086,-116.981562&z=17&pll=32.842086,-116.981562",
    "mapsUrl":"http://maps.google.com/?q=Santee Town Center@32.842086,-116.981562",
    "shortCode":""
  },
  {
    "name":"Hamilton's Cluster",
    "area":"South Park",
    "intelUrl":"https://www.ingress.com/intel?ll=32.721708,-117.13011&z=17&pll=32.721708,-117.13011",
    "mapsUrl":"http://maps.google.com/?q=Hamilton's Cluster@32.721708,-117.13011",
    "shortCode":"SP"
  },
  {
    "name":"Station Cluster",
    "area":"South Park ",
    "intelUrl":"https://www.ingress.com/intel?ll=32.728719,-117.129717&z=17&pll=32.728719,-117.129717",
    "mapsUrl":"http://maps.google.com/?q=Station Cluster@32.728719,-117.129717",
    "shortCode":"SP"
  },
  {
    "name":"Vista Village",
    "area":"Vista",
    "intelUrl":"https://www.ingress.com/intel?ll=33.202468,-117.241979&z=17&pll=33.202468,-117.241979",
    "mapsUrl":"http://maps.google.com/?q=Vista Village@33.202468,-117.241979",
    "shortCode":"VV"
  }
];