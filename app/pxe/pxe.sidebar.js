(function () {
  'use strict';

  angular
    .module('app.pxe')
    .config(SidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SidebarConfig(SidebarProvider) {
    SidebarProvider.group('pxe', {
      translate: "sidebar.pxe.TITLE",
      sref: "app.pxe.install",
      icon: "fa fa-upload",
    }).item({
      text: "OS Reloads",
      sref: "app.pxe.install",
    })
    ;
  }
})();
