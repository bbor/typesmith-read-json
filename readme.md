# typesmith-read-json

This plugin for [typesmith.js](http://www.github.com/bbor/typesmith) reads JSON data from a file that you specify, and adds that data to the typesmith database.

## Options

`filename`

>	The JSON file or files to read. May be a single string, or an array of strings. Each string in turn can be a single file or a glob. So `'input/myfile.json'` or `'input/*.json'` or `['input/*','otherfile.json']` are all valid. Each JSON file can contain a single record, or it can contain an array of records.

## Usage

As any other `typesmith` plugin, require it in your module and pass it to `typesmith.use()`:

```js
var typesmith = require('typesmith');
var readJson = require('typesmith-read-json');
... // require other plugins

var config = {
	... // config options and type info goes here
}

typesmith(config)
  .use(readJson())
  .use(readMarkdown())
  .use(autoparent())
  .use(subgroup())
  .use(writeJson())
  .use(writeHtml())
  .run( function(errmsg) { if (errmsg) { console.log("Error: " + errmsg); } console.log('finished!'); } );

```
