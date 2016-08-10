(function () {
  'use strict';

  angular
    .module('app.network')
    .config(SidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SidebarConfig(SidebarProvider) {
    SidebarProvider.group('network', {
      translate: "sidebar.network.TITLE",
      sref: "#",
      icon: "fa fa-sitemap",
    });
  }
})();
