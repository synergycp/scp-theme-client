(function () {
  'use strict';

  angular
    .module('app.pxe')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(NavProvider) {
    NavProvider.group('pxe', {
      translate: "nav.pxe.TITLE",
      sref: "app.pxe.install.list",
      icon: "fa fa-upload",
    }).item({
      text: "OS Reloads",
      sref: "app.pxe.install.list",
    })
    ;
  }
})();
