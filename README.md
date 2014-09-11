orcidSearchUrl.js
=================

Javascript library that builds a search URL for the ORCID public API.

## Functions

* buildUrl(input) Takes a JSON object defining the search, and returns the URL to use in the API.

The input JSON object can have the following properties.

<table>
    <tr>
        <th>Property</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>text</td>
        <td>The text for a quick search across all fields. Can also be an ORCID iD, in which case only the iD field will be searched.</td>
    </tr>
    <tr>
        <td>givenNames</td>
        <td>Text to search across the given-names field.</td>
    </tr>
    <tr>
        <td>searchOtherNames</td>
        <td>Boolean to determine whether to search for givenNames in the other-names field. Default is false.</td>
    </tr>
    <tr>
        <td>familyName</td>
        <td>Text to search across the family-name field.</td>
    </tr>
    <tr>
        <td>keyword</td>
        <td>Text to search across the keyword field.</td>
    </tr>
</table>

See orcidSearchUrlSpec.js for examples.


## Using in a browser
Include orcidSearchUrl.js and call ``orcidSearchUrlJs.buildUrl({ text: 'my search terms'})``.


## Using in [Node.js](http://nodejs.org/)
1. Install
    
    npm install orcid-search-url-js
    
2. Require the module

    var orcidSearchUrl = require('orcid-search-url-js');
    
3. Call

    orcidSearchUrlJs.buildUrl({ text: 'my search terms'});

   
## Contributing

Contributions are welcome.

Please make sure the unit tests (orcidSearchUrlSpec.js) reflect the changes and complete successfully. 