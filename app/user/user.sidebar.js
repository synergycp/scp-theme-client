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
    NavProvider.group('user', {
      translate: "nav.USERS",
      sref: "app.account.settings",
      icon: "fa fa-user",
    }).item({
      text: "My Account",
      sref: "app.account.settings",
    }).item({
      text: "Sub Clients",
      sref: "app.user.client.list",
    });
  }
})();
