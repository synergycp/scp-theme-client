(function () {
  'use strict';

  angular
    .module('app.user')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(NavProvider) {
    NavProvider
      .group('user', {
        translate: "nav.USERS",
        sref: "app.account.settings",
        icon: "fa fa-user",
      });
  }
})();
