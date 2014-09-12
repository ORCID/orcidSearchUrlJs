/*
 * Tests
 */
var orcidSearchUrlJs = require('../orcidSearchUrl.js');

describe(
		'Quick search',
		function() {
			it(
					'should create a URL to search across all fields',
					function() {
						var input = {
							text : 'my search terms'
						};
						var url = orcidSearchUrlJs.buildUrl(input);
						expect(url)
								.toBe(
										'https://orcid.org/v1.1/search/orcid-bio/?q=%7B!edismax%20qf%3D%22given-and-family-names%5E50.0%20family-name%5E10.0%20given-names%5E5.0%20credit-name%5E10.0%20other-names%5E5.0%20text%5E1.0%22%20pf%3D%22given-and-family-names%5E50.0%22%20mm%3D1%7Dmy%20search%20terms&start=0&rows=10');
					});
			it(
					'should be possible to use a different offset',
					function() {
						var input = {
							text : 'my search terms',
							start : 15,
							rows : 5
						};
						var url = orcidSearchUrlJs.buildUrl(input);
						expect(url)
								.toBe(
										'https://orcid.org/v1.1/search/orcid-bio/?q=%7B!edismax%20qf%3D%22given-and-family-names%5E50.0%20family-name%5E10.0%20given-names%5E5.0%20credit-name%5E10.0%20other-names%5E5.0%20text%5E1.0%22%20pf%3D%22given-and-family-names%5E50.0%22%20mm%3D1%7Dmy%20search%20terms&start=15&rows=5');
					});
			it(
					'should be possible to override the base URL',
					function() {
						delete require.cache[require.resolve('../orcidSearchUrl.js')];
						var orcidSearchUrlJs2 = require('../orcidSearchUrl.js');
						orcidSearchUrlJs2.setBaseUrl('http://localhost:8080/orcid-pub-web/v1.1/search/orcid-bio/');
						var input = {
							text : 'my search terms'
						};
						var url = orcidSearchUrlJs2.buildUrl(input);
						expect(url)
								.toBe(
										'http://localhost:8080/orcid-pub-web/v1.1/search/orcid-bio/?q=%7B!edismax%20qf%3D%22given-and-family-names%5E50.0%20family-name%5E10.0%20given-names%5E5.0%20credit-name%5E10.0%20other-names%5E5.0%20text%5E1.0%22%20pf%3D%22given-and-family-names%5E50.0%22%20mm%3D1%7Dmy%20search%20terms&start=0&rows=10');
					});
		});

describe('ORCID iD search', function() {
	it('should create a URL to search only the ORCID iD field', function() {
		var input = {
			text : '0000-0003-4654-1403'
		};
		var url = orcidSearchUrlJs.buildUrl(input);
		expect(url).toBe('https://orcid.org/v1.1/search/orcid-bio/?q=orcid:0000-0003-4654-1403&start=0&rows=10');
	});
});

describe(
		'Advanced search',
		function() {
			it(
					'should create a URL to do an advanced search on the fields supplied in the input',
					function() {
						var input = {};
						input.givenNames = 'Will';
						input.familyName = 'Simpson';
						input.searchOtherNames = true;
						input.keyword = 'Physics';
						var url = orcidSearchUrlJs.buildUrl(input);
						expect(url)
								.toBe(
										'https://orcid.org/v1.1/search/orcid-bio/?q=given-names%3Awill%20AND%20family-name%3Asimpson%20OR%20other-names%3Awill%20AND%20keyword%3Aphysics');
					});
		});

describe('Validate input', function() {
	it('should check if there are no search terms provided', function() {
		var input = {};
		var validationResult = orcidSearchUrlJs.isValidInput(input);
		expect(validationResult).toBe(false);
	});
	it('should pass if any search terms provided', function() {
		var input = {};
		input.familyName = 'Crumblehume';
		var validationResult = orcidSearchUrlJs.isValidInput(input);
		expect(validationResult).toBe(true);
	});

});
