## Introduction
Parse urls from css file

[![Version](https://img.shields.io/npm/v/css-url-parser.svg?style=flat)](https://www.npmjs.org/package/css-url-parser)
[![Downloads](https://img.shields.io/npm/dm/css-url-parser.svg?style=flat)](https://www.npmjs.org/package/css-url-parser)
[![Node.js CI](https://github.com/website-scraper/node-css-url-parser/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/website-scraper/node-css-url-parser/)
[![Coverage Status](https://coveralls.io/repos/website-scraper/node-css-url-parser/badge.svg)](https://coveralls.io/r/website-scraper/node-css-url-parser)
[![Code Climate](https://codeclimate.com/github/website-scraper/node-css-url-parser/badges/gpa.svg)](https://codeclimate.com/github/website-scraper/node-css-url-parser)

## Installation
```
npm install css-url-parser
```

## Usage
```javascript
var parseCssUrls = require('css-url-parser');

var css = '@import "a.css"; .image { background-image: url(images/img.png); }';
var cssUrls = parseCssUrls(css);

console.log(cssUrls);   // [ 'a.css', 'images/img.png' ]
```

It ignores duplicated urls and base64 encoded resources.
If no urls found empty array will be returned.
