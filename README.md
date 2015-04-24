## Introduction
Parse urls from css file

[![Build Status](https://img.shields.io/travis/s0ph1e/node-css-url-parser/master.svg?style=flat)](https://travis-ci.org/s0ph1e/node-css-url-parser)
[![Coverage Status](https://coveralls.io/repos/s0ph1e/node-css-url-parser/badge.svg)](https://coveralls.io/r/s0ph1e/node-css-url-parser)

## Installation
`npm install css-url-parser`

## Usage
```javascript
var parseCssUrls = require('css-url-parser'); 

var css = '@import "a.css"; .image { background-image: url(images/img.png); }';
var cssUrls = parseCssUrls(css);

console.log(cssUrls);   // [ 'a.css', 'images/img.png' ]
```

