var parseCssUrls = require('../index');
var should = require('should');

describe('Parse css urls', function(){
	it('should return array of entries from url(...), @import url(...) and @import ...', function(){
		var text = '\
			@import url("a.css");                  \
			@import url(\'b.css\') tv;             \
			@import url(c.css);                    \
			@import "d.css" screen;                \
			@import \'e.css\';                     \
			@import f.css;                         \
			.image {                               \
				background-image: url ("g.css");   \
				background-image: url (\'h.css\'); \
				background-image: url (i.css);	   \
			}                                      \
		';

		var urls = parseCssUrls(text);
		urls.should.be.instanceof(Array).and.have.lengthOf(9);
		urls.should.containEql('a.css');
		urls.should.containEql('b.css');
		urls.should.containEql('c.css');
		urls.should.containEql('d.css');
		urls.should.containEql('e.css');
		urls.should.containEql('f.css');
		urls.should.containEql('g.css');
		urls.should.containEql('h.css');
		urls.should.containEql('i.css');
	});

	it('should exclude duplicated urls', function(){
		var text = '\
			@import url("a.css");                \
			@import a.css;                       \
			.image { background: url("a.css"); } \
		';

		var urls = parseCssUrls(text);
		urls.should.be.instanceof(Array).and.have.lengthOf(1);
		urls.should.containEql('a.css');
	});

	it('should ignore base64 encoded urls', function(){
		var text = '\
			div.image { \
				background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAACXklEQVQ4T82TX0hTYRjGZ8Oryp2j5f5l/iHKdVOjZabzSm1MnNuB0sSI1BiNLqoLt93UVTejSJ1L19of0Qs1aNG6CELmhcacZRmZkIUWhUZBF92EFc/pe7/IdEbXffDy8j7P7zy8nPMdheK/Obn7Tur1Vl9/kaMnWSIFkrubQklDczS5tyXGO82kk6+z+gYFY1vhuuXzzJ7hgqYhuahxQN7VMiwbWuOyoT0hF564yzvNpJNPXF6VN742QJlb5X2kl8LYKQVR0hhFyfEBHHLFcTE6zTvNpJNPHPEsQPk7JFusdE+uDdhmC+NSdAp0qNO8NoB49nD2nwCzJ6WTbqLA0Yfio2FopQjGnrzHnfFFPHy+DK0jguJjYe4TJzI+I6AjpbOHsMPeC40tiCMX4ph78xnG9hG8/fAFNedvQ9MQ5D5xorkjI6CiI6VlgL4hgC013egamcbQ6EsoyjuRmFhAJ5tJJ584kfHrN2CC2tYHbb0fuRY/nr3+iHNdY1DbbsAbnMDswieIlm7uaxi3MYCtpK7vhar6Ciqdg/i68h3pF0uYnF3C1NwyVr79QIVzgPlXQdxfA/Lrr0N5+DIi92bwIL2I7VY/SpvDyK/rwfjMO0QST7lP3MZ3YHY/zmfJQrUPDvcIytpiEGqvQV3n5738dD/Tb3H/V4CH7sHqZ8xSmVz3NVJM1th65c3VXbJgCcg6R0jW2kO8qyw9XCdfI/XLQtnZURawafU2KnMKanP2n0qpDrpeqQ4453mZnPOC6Qzvqxrztxpb00qx0Jr5I2cxQcuqlNWef5SBeTpWxCt+AlBhYa97xG2bAAAAAElFTkSuQmCC\'); \
			}           \
		';

		var urls = parseCssUrls(text);
		urls.should.be.instanceof(Array);
		urls.should.have.length(0);
	});

	it('should ignore empty urls', function(){
		var text = 'div.image { background-image: url(""); } ';

		var urls = parseCssUrls(text);
		urls.should.be.instanceof(Array);
		urls.should.have.length(0);
	});

	it('should return empty array if no urls were found', function(){
		var text = 'no css urls should be found in this text';

		var urls = parseCssUrls(text);
		urls.should.be.instanceof(Array);
		urls.should.have.length(0);
	});

	describe('comments', function() {
		it('should ignore comments and return empty array if there are only comments in text', function(){
			var text = '\
				/* @import url("a.css");                         \
				 @import url("b.css");                           \
				 .image { background-image: url("bg.png"); } */  \
				 \
			';

			var urls = parseCssUrls(text);
			urls.should.be.instanceof(Array);
			urls.should.have.length(0);
		});

		it('should ignore comments and return only urls from rules', function(){
			var text = '\
				/* @import url("a.css"); */            \
				@import url("b.css");                  \
			';

			var urls = parseCssUrls(text);
			urls.should.be.instanceof(Array);
			urls.should.have.length(1);
			urls.should.containEql('b.css');
		});

		it('should ignore comments because they may be tricky', function(){
			var text = '\
				/* @import hahahaha  */\
				@import url("a.css");  \
			';

			var urls = parseCssUrls(text);
			urls.should.be.instanceof(Array);
			urls.should.have.length(1);
			urls.should.containEql('a.css');
		});
	});
});
