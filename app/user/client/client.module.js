(function () {
  'use strict';

  angular
    .module('app.user.client', [
      'app.user.client.list',
      'app.user.client.search',
      'app.user.client.super',
    ]);
})();
