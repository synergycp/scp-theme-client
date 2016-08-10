(function () {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.auth',
      'app.layout',
      'app.user',
      'app.pxe',
      'app.hardware',
      'app.network',
      'app.package',
      'app.util',
    ]);
})();
