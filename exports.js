var Util = require('scp-ng-util');

module.exports = [
  Util
    .export('scp-angle-client', __dirname)
    .include([
      'scp-angle',
    ]),
];
