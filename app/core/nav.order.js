(function () {
  'use strict';

  angular
    .module('app.core')
    .config(NavOrderConfig)
    ;

  /**
   * @ngInject
   */
  function NavOrderConfig(NavProvider) {
    NavProvider.order([
      'header',
      'dashboard',
      'user',
      'network',
      'hardware',
      'system',
    ]);
    NavProvider.group('header', {
      heading: "true",
      translate: "app.nav.heading.HEADER"
    });
    NavProvider.group('dashboard', {
      translate: "nav.DASH",
      sref: "app.hardware.server.list",
      icon: "fa fa-home",
      order: 0
    });
  }
})();
