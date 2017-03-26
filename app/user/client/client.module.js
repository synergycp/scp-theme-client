(function () {
  'use strict';

  angular
    .module('app.user.client', [
      'app.user.client.search',
      'app.user.client.sub',
      'app.user.client.super',
    ]);
})();
