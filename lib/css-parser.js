var embeddedRegexp = /^data:(.*?),(.*?)/;
var commentRegexp = /\/\*([\s\S]*?)\*\//g;
var urlsRegexp = /((?:@import\s+)?url\s*\(\s*['"]?)(.*?)(['"]?\s*\))|(@import\s+['"]?)([^;'"]+)/ig;

function isEmbedded (src) {
	return embeddedRegexp.test(src.trim());
}

function getUrls (text) {
	var urls = [];
	var urlMatch, url;

	text = text.replace(commentRegexp, '');

	while (urlMatch = urlsRegexp.exec(text)) {
		// Match 2 group if '[@import] url(path)', match 5 group if '@import path'
		url = urlMatch[2] || urlMatch[5];

		if (url && !isEmbedded(url) && urls.indexOf(url) === -1) {
			urls.push(url);
		}
	}

	return urls;
}

module.exports = getUrls;
