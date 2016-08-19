/**
 *
 * @author ??
 * @author Assaf Moldavsky
 */
//var embeddedRegexp = /data:(.*?);base64,/;
var dataURIPattern = "data:image";
// var commentRegexp = /\/\*([\s\S]*?)\*\//g;
var urlsRegexp = /((?:@import\s+)?url\s*\(['"]?)(\S*?)(['"]?\s*\))|(@import\s+['"]?)([^;'"]+)/ig;

/**
 * Determines if a given URL is a data / embedded URL
 *
 * @param 	{string}	url	The URL to test
 * @returns {*|boolean}		true if embedded; false otherwise
 */
function isEmbedded( url ) {
	//return embeddedRegexp.test(src);
	return url && url.substring( 0, dataURIPattern.length ) === dataURIPattern;
}

/**
 * Collects URLs from a given CSS text
 * @param 	{string}	text	A CSS in form of a text string
 * @returns {Array}				Parsed URLs minus dataURIs
 */
function getUrls( text ) {

	if( !text ) return [];

	// Assaf: this will be expensive if the text is large
	// no need to do an extra regexp pass through the entire text...
	//text = text.replace(commentRegexp, '');

	// Assaf: to have only unique urls for performance we will use
	// key lookups. V8 does that in O(1) vs using an array search which
	// will cost us O(n) for every lookup ( for N urls this will be O( N^2 ) -> very expensive!!! ).
	// We will pay a little bit in memory though.
	var urlsMap = {};

	while( ( urlMatch = urlsRegexp.exec(text)) ) {

		// Match 2 group if '[@import] url(path)', match 5 group if '@import path'
		var url = urlMatch[ 2 ] || urlMatch[ 5 ];
		if( url && !isEmbedded( url ) ) {
			urlsMap[ url ] = 1;
		}

	}
	
	return Object.keys( urlsMap );

}

module.exports = getUrls;
