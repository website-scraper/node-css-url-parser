var _ = require('lodash');

var embeddedRegexp = /data:(.*?);base64,/;
var commentRegexp = /\/\*([\s\S]*?)\*\//g;
var urlsRegexp = /((?:@import\s+)?url\s*\(['"]?)(\S*?)(['"]?\s*\))|(@import\s+['"]?)([^;'"]+)/ig;

function isEmbedded (src) {
	return embeddedRegexp.test(src);
}

function getUrls (text) {
	var urls = [];
	var urlMatch;

	text = text.replace(commentRegexp, '');

	while (urlMatch = urlsRegexp.exec(text)) {
		// Match 2 group if '[@import] url(path)', match 5 group if '@import path'
		urls.push(urlMatch[2]||urlMatch[5]);
	}

	return _.chain(urls)
		.compact()
		.reject(isEmbedded)
		.uniq()
		.value();
}

module.exports = getUrls;
