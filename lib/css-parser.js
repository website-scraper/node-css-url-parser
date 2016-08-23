var embeddedRegexp = /data:(.*?);base64,/;
var commentRegexp = /\/\*([\s\S]*?)\*\//g;
var urlsRegexp = /((?:@import\s+)?url\s*\(['"]?)(\S*?)(['"]?\s*\))|(@import\s+['"]?)([^;'"]+)/ig;

function isEmbedded (src) {
	return embeddedRegexp.test(src);
}

function getUrls (text) {
	var urls = [];
	var urlMatch, url, isEmbeddedUrl, isDuplicatedUrl;

	text = text.replace(commentRegexp, '');

	while (urlMatch = urlsRegexp.exec(text)) {
		// Match 2 group if '[@import] url(path)', match 5 group if '@import path'
		url = urlMatch[2] || urlMatch[5];

		isEmbeddedUrl = isEmbedded(url);
		isDuplicatedUrl = urls.indexOf(url) !== -1;

		if (url && !isEmbeddedUrl && !isDuplicatedUrl) {
			urls.push(url);
		}
	}

	return urls;
}

module.exports = getUrls;
