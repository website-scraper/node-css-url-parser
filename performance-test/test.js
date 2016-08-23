var fs = require('fs');
var Benchmark = require('benchmark');


var withLodash = require('./css-url-parser/withLodash');
var withObjectKeys = require('./css-url-parser/withObjectKeys');
var withArrayIndexof = require('./css-url-parser/withArrayIndexof');

function runTest(text) {
	var suite = new Benchmark.Suite;
	//console.log(text);
	console.log('text length = ' + text.length);

	suite.add('lodash', function() {
	  withLodash(text);
	})
	.add('object.keys', function() {
	  withObjectKeys(text);
	})
	.add('array.indexOf', function() {
	  withArrayIndexof(text);
	})
	.on('cycle', function(event) {
	  console.log(String(event.target));
	})
	.on('complete', function() {
	  console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run();
}


for (var i = 1; i <= 10; i++) {
	var cssTextSample = fs.readFileSync('./samples/' + i + '.css').toString();
	runTest(cssTextSample);
}

