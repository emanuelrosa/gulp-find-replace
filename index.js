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
      defaultFlag = 'g';

    // =================
    // for each repalce value, run find and replace

    if(replace !== ''){

      for(var index = 0; index < replace.length; ++index){

        if(typeof replace[index].regex !== 'undefined' && typeof replace[index].replace !== 'undefined'){

          if(typeof replace[index].flag !== 'undefined'){

            if(Array.isArray(replace[index].flag)){
              replace[index].flag = replace[index].flag.join("");
            }

          }else{
            replace[index].flag = defaultFlag;
          }

          str = str.replace(new RegExp(replace[index].regex, replace[index].flag), replace[index].replace);

        }

      }

    }

    // =================
    // define content with "str" value

    file.contents = new Buffer(str);

    cb(null, file);

  });
};