var request = require('request');

module.exports = function (serviceName) {
	return new Promise(function (resolve, reject) {
		request.get('http://desertmonstersserviceregistry-93127.onmodulus.net/registrations/' + serviceName, function (err, result) {
			if (!result) {
				return reject('No service');
			}

			var data = JSON.parse(result.body);

			if(data && data.length) {
				resolve(data[0].meta.url);
			} else {
				reject('No service');
			}
		});
	});
}