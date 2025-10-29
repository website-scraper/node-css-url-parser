## Introduction
Parse urls from css file

[![Version](https://img.shields.io/npm/v/css-url-parser.svg?style=flat)](https://www.npmjs.org/package/css-url-parser)
[![Downloads](https://img.shields.io/npm/dm/css-url-parser.svg?style=flat)](https://www.npmjs.org/package/css-url-parser)
[![Node.js CI](https://github.com/website-scraper/node-css-url-parser/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/website-scraper/node-css-url-parser/)
[![Coverage Status](https://coveralls.io/repos/website-scraper/node-css-url-parser/badge.svg)](https://coveralls.io/r/website-scraper/node-css-url-parser)
[![Code Coverage](https://qlty.sh/gh/website-scraper/projects/node-css-url-parser/coverage.svg)](https://qlty.sh/gh/website-scraper/projects/node-css-url-parser)
[![Maintainability](https://qlty.sh/gh/website-scraper/projects/node-css-url-parser/maintainability.svg)](https://qlty.sh/gh/website-scraper/projects/node-css-url-parser)

## Sponsors
Maintenance of this project is made possible by all the [contributors](https://github.com/website-scraper/node-css-url-parser/graphs/contributors) and [sponsors](https://github.com/sponsors/s0ph1e).
If you'd like to sponsor this project and have your avatar or company logo appear below [click here](https://github.com/sponsors/s0ph1e). 💖

<!-- sponsors --><a href="https://github.com/aivus"><img src="https:&#x2F;&#x2F;github.com&#x2F;aivus.png" width="60px" alt="User avatar: Illia Antypenko" /></a><a href="https://github.com/swissspidy"><img src="https:&#x2F;&#x2F;github.com&#x2F;swissspidy.png" width="60px" alt="User avatar: Pascal Birchler" /></a><a href="https://github.com/itscarlosrufo"><img src="https:&#x2F;&#x2F;github.com&#x2F;itscarlosrufo.png" width="60px" alt="User avatar: Carlos Rufo" /></a><a href="https://github.com/francescamarano"><img src="https:&#x2F;&#x2F;github.com&#x2F;francescamarano.png" width="60px" alt="User avatar: Francesca Marano" /></a><a href="https://github.com/github"><img src="https:&#x2F;&#x2F;github.com&#x2F;github.png" width="60px" alt="User avatar: GitHub" /></a><a href="https://github.com/Belrestro"><img src="https:&#x2F;&#x2F;github.com&#x2F;Belrestro.png" width="60px" alt="User avatar: Andrew Vorobiov" /></a><a href="https://github.com/Effiezhu"><img src="https:&#x2F;&#x2F;github.com&#x2F;Effiezhu.png" width="60px" alt="User avatar: " /></a><a href="https://github.com/slicemedia"><img src="https:&#x2F;&#x2F;github.com&#x2F;slicemedia.png" width="60px" alt="User avatar: " /></a><!-- sponsors -->

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
