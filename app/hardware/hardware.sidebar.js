(function () {
  'use strict';

  angular
    .module('app.hardware')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(NavProvider) {
    NavProvider.group('hardware', {
      translate: "nav.HARDWARE",
      icon: "fa fa-server",
      sref: "app.hardware.server.list",
    }).item({
      text: "Servers",
      sref: "app.hardware.server.list",
    });
  }
})();
