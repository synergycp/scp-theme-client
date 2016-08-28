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
      sref: "app.user.account.index",
      icon: "fa fa-user",
    }).item({
      text: "My Account",
      sref: "app.user.account.index",
    }).item({
      text: "Sub Clients",
      sref: "app.user.client.list",
    });
  }
})();
