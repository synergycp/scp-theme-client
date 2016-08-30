(function () {
  'use strict';

  angular
    .module('app.pxe')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(NavProvider, PxeInstallNav) {
    NavProvider
      .group('pxe', {
        translate: "nav.pxe.TITLE",
        sref: "app.pxe.install.list",
        icon: "fa fa-upload",
      })
      .item(PxeInstallNav)
      ;
  }
})();
