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

  var result = {
    _type: 'dir',
    _path: start
  };
  var startKey = _.last(start.split('/'));
  result[startKey] = {};
  result[startKey]._type = 'dir';
  result[startKey]._path = start;

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
          target[f]._contents = fs.readFileSync(dirPath + '/' + f, 'utf-8');
        }
      });
    }
  };

  file.walkSync(start, callback);

  // console.log(JSON.stringify(result, undefined, 2));
  return result;

};

exports.hashToDir = function(start, hash) {

  if (_.isEqual(hash._type, 'dir')) {
    try {
      fs.mkdirSync(start);
    } catch (err) {
      if (err && !_.isEqual(err.code, 'EEXIST')) {
        console.log('Error in creating directory', err);
      }
    }
    _.each(hash, function(value, key) {
      if (!_.isEqual(_.first(key), '_')) {
        if (_.isEqual(value._type, 'file')) {
          fs.writeFileSync(start + '/' + key, value._contents);
        } else if (_.isEqual(value._type, 'dir')) {
          exports.hashToDir(start + '/' + key, value);
        }
      }
    });
  } else {
    console.log('hashToDir should only be called with a directory');
  }

};
