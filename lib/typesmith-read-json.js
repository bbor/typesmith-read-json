
var fs = require('fs');
var glob = require('glob');
var minify = require('strip-json-comments');
var merge_options = require('merge-options');

module.exports = plugin;

function plugin(opts) {

  var plugin_defaults = {};

  return function(typesmith, done){
    var config = merge_options.call({concatArrays: true}, {}, plugin_defaults, typesmith.config['typesmith-read-json'], opts);

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

    if (config.filename)
    {
      if (typeof(config.filename) == "string")
        config.filename = [config.filename];
      for (var i_glob = 0; i_glob < config.filename.length; i_glob++)
      {
        globjobs++;
        var mg = new glob.Glob(config.filename[i_glob], {}, handle_matches)
      }
    }
    else {
      done();
    }
  };

}