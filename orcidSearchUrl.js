/* START: orcidSearchUrlJs v0.0.1 */
/* https://github.com/ORCID/orcidSearchUrlJs */

/* browser and NodeJs compatible */
(function(exports) {

	var baseUrl = 'https://orcid.org/v1.1/search/orcid-bio/';
	var quickSearchEDisMax = '{!edismax qf="given-and-family-names^50.0 family-name^10.0 given-names^5.0 credit-name^10.0 other-names^5.0 text^1.0" pf="given-and-family-names^50.0" mm=1}';
	var orcidPathRegex = new RegExp("(\\d{4}-){3,}\\d{3}[\\dX]");
	var orcidFullRegex = new RegExp(
			"^\\s*((http://)?([^/]*orcid\\.org|localhost.*/orcid-web)/)?(\\d{4}-){3,}\\d{3}[\\dX]\\s*$");

	function offset(input) {
		var start = hasValue(input.start) ? input.start : 0;
		var rows = hasValue(input.rows) ? input.rows : 10;
		return '&start=' + start + '&rows=' + rows;
	}

	function hasValue(ref) {
		return typeof ref !== 'undefined' && ref !== null && ref !== '';
	}

	function buildAdvancedSearchUrl(input) {
		var query = '';
		var doneSomething = false;
		if (hasValue(input.givenNames)) {
			query += 'given-names:' + input.givenNames.toLowerCase();
			doneSomething = true;
		}
		if (hasValue(input.familyName)) {
			if (doneSomething) {
				query += ' AND ';
			}
			query += 'family-name:' + input.familyName.toLowerCase();
			doneSomething = true;
		}
		if (hasValue(input.searchOtherNames) && hasValue(input.givenNames)) {
			query += ' OR other-names:' + input.givenNames.toLowerCase();
		}
		if (hasValue(input.keyword)) {
			if (doneSomething) {
				query += ' AND ';
			}
			query += 'keyword:' + input.keyword.toLowerCase();
			doneSomething = true;
		}
		return doneSomething ? baseUrl + '?q=' + encodeURIComponent(query) + offset(input) : null;
	}

	exports.setBaseUrl = function(url) {
		baseUrl = url;
	};

	exports.isValidInput = function(input) {
		var fieldsToCheck = [ input.text, input.givenNames, input.familyName, input.keyword ];
		for ( var i = 0; i < fieldsToCheck.length; i++) {
			if (hasValue(fieldsToCheck[i])) {
				return true;
			}
		}
		return false;
	};

	function extractOrcidId(string) {
		var regexResult = orcidPathRegex.exec(string);
		if (regexResult) {
			return regexResult[0];
		}
		return null;
	}

	exports.buildUrl = function(input) {
		if (hasValue(input.text)) {
			var orcidId = extractOrcidId(input.text);
			if (orcidId) {
				// Search for iD specifically
				return baseUrl + "?q=orcid:" + orcidId + offset(input);
			}
			// General quick search
			return baseUrl + '?q=' + encodeURIComponent(quickSearchEDisMax + input.text) + offset(input);
		} else {
			// Advanced search
			return buildAdvancedSearchUrl(input);
		}
	};

	exports.isValidOrcidId = function(orcidId) {
		if (orcidFullRegex.exec(orcidId)) {
			return true;
		}
		return false;
	};

})(typeof exports === 'undefined' ? this.orcidSearchUrlJs = {} : exports);

/* END: orcidSearchUrlJs */