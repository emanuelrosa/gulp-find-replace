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

    var str = file.contents.toString();

    // =================
    // for each repalce value, run find and replace

    if(replace !== ''){

      for(index = 0; index < replace.length; ++index){
        if(typeof replace[index][0] !== 'undefined' && typeof replace[index][1] !== 'undefined'){
          str = str.replace(replace[index][0], replace[index][1]);
        }
      }

    }

    // =================
    // define content with "str" value

    file.contents = new Buffer(str);

    cb(null, file);

  });
};