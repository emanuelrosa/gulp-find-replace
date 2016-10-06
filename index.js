var es = require('event-stream');
var gutil = require('gulp-util');

module.exports = function(replace) {

  'use strict';

  // =================
  // validate parameter: replace

  replace = typeof replace !== 'undefined' ? replace : '';

  // =================
  // stream file

  return es.map(function (file, cb) {

    // =================
    // content file to str

    var
      str = file.contents.toString(),
      regex;

    // =================
    // for each repalce value, run find and replace

    if(replace !== ''){

      for(var index = 0; index < replace.length; ++index){
        if(typeof replace[index][0] !== 'undefined' && typeof replace[index][1] !== 'undefined'){

          //
          // example: A. regex: '/\n|\r/g';
          // need to ...
          // remove first and last slashe '/' (indicate start/end of a regular expression)
          // remove expression flags 'g' (for example)
          // and escape all the backslashes
          // then: A. regex: '\\n|\\r';

          // replace parameter value need to be '\\n|\\r' and not '/\n|\r/g' (that's wrong). ¬¬'
          // http://stackoverflow.com/questions/11143702/how-to-pass-a-regular-expression-as-a-function-parameter
          //

          regex = new RegExp(replace[index][0], 'g');
          str = str.replace(regex, replace[index][1]);

        }
      }

    }

    // =================
    // define content with "str" value

    file.contents = new Buffer(str);

    cb(null, file);

  });
};