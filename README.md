# dirToHash [![Build Status](https://secure.travis-ci.org/stanleygu/dirtohash.png?branch=master)](http://travis-ci.org/stanleygu/dirtohash)

> Simply get a hash from a file tree.


## Getting Started

Install the module with: `npm install dirToHash`

```js
var dirToHash = require('dirToHash').dirToHash;
// "Hash of structure of directory tree"
var hash = file.dirToHash('/path/to/your/directory', {
  ignoreDirs: ['node_modules', 'bower_components'], // File extensions to exclude
  ignoreExts: ['js', 'bak'], // Folder names to exclude
});
```

## Documentation

_(Coming soon)_


## Examples

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Stanley Gu  
Licensed under the MIT license.
