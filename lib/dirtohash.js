/*
 * dirToHash
 * https://github.com/stanleygu/dirToHash
 *
 * Copyright (c) 2014 Stanley Gu
 * Licensed under the MIT license.
 */

'use strict';

var file = require('file');
var fs = require('fs');
var _ = require('lodash');

exports.dirToHash = function(start, opts) {

  // opts = {
  //   ignoreDirs: [],
  //   ignoreExts: []
  // }

  opts = opts || {};

  var result = {};
  var startKey = _.last(start.split('/'));
  result[startKey] = {};
  result[startKey]._type = 'dir';

  var callback = function(dirPath, dirs, files) {

    var path = dirPath.split('/');
    var target = result;
    var ignore = false;
    _.each(path, function(p) {
      if (_.contains(opts.ignoreDirs, p)) {
        ignore = true;
      }

      if (target[p]) {
        target = target[p];
      }
    });

    if (!ignore) {
      _.each(dirs, function(d) {
        if (!(_.contains(opts.ignoreDirs, d))) {
          target[d] = {};
          target[d]._type = 'dir';
          target[d]._path = dirPath;
        }
      });

      _.each(files, function(f) {
        var ext = _.last(f.split('.'));
        if (!(_.contains(opts.ignoreExts, ext))) {
          target[f] = {};
          target[f]._type = 'file';
          target[f]._path = dirPath;
          target[f].contents = fs.readFileSync(dirPath + '/' + f, 'utf-8');
        }
      });
    }
  };

  file.walkSync(start, callback);

  // console.log(JSON.stringify(result, undefined, 2));
  return result;

};
