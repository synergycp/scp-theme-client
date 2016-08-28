(function () {
  'use strict';

  angular
    .module('app.network')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(NavProvider) {
    NavProvider.group('network', {
      translate: "nav.network.TITLE",
      icon: "fa fa-sitemap",
    });
  }
})();
