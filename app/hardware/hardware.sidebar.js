(function () {
  'use strict';

  angular
    .module('app.hardware')
    .config(SidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SidebarConfig(SidebarProvider) {
    SidebarProvider.group('hardware', {
      translate: "sidebar.HARDWARE",
      icon: "fa fa-server",
      sref: "app.hardware.server.list",
    }).item({
      text: "Servers",
      sref: "app.hardware.server.list",
    });
  }
})();
