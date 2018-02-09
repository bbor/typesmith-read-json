
var fs = require('fs');
var glob = require('glob');
var minify = require('strip-json-comments');

module.exports = plugin;

/*
  options:
  - filename: the JSON file or files to read. May be a single string, or an array of strings.
              Each string can be a single file or a glob. So `'input/myfile.json'` or `'input/*.json'`
              or `['input/*','otherfile.json']` are all valid.
*/

function plugin(opts) {

  return function(typesmith, done){
    opts = opts || typesmith.config['typesmith-read-json'] || {}

    var globjobs = 0;

    var handle_matches = function(err, matches) {
      globjobs--;
      for (var i_match = 0; i_match < matches.length; i_match++)
      {
        var file_content = minify( fs.readFileSync(matches[i_match], 'utf8') );
        var json = JSON.parse(file_content);
        typesmith.add_to_db(json);
      }
      if (globjobs == 0) done();
    }

    if (opts.filename)
    {
      if (typeof(opts.filename) == "string")
        opts.filename = [opts.filename];
      for (var i_glob = 0; i_glob < opts.filename.length; i_glob++)
      {
        globjobs++;
        var mg = new glob.Glob(opts.filename[i_glob], {}, handle_matches)
      }
    }
    else {
      done();
    }
  };

}