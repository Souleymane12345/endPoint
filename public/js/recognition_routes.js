var request = require("request");
var fs = require("fs");

var options = {
	method: 'POST',
	url: "https://api.luxand.cloud/photo/search",
	qs: {},
	headers: {
		'token': "46a46e2db1e2400bbf5e3d0e04af2f51"
	},
	formData: { 
		photo: fs.createReadStream('./public/images/people/11.jpeg') ,
		// or use URL 
		//photo: 'https://dashboard.luxand.cloud/img/brad.jpg' 
	}
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	var data = JSON.parse(body)
	console.log(data[0]['probability']);
});