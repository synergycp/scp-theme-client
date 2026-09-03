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
      sref: "app.user.client.sub.list",
    }).item({
      text: "Super Clients",
      sref: "app.user.client.super.list"
    }).item({
      text: "SSH Public Keys",
      sref: "app.user.ssh-key.home",
    }).item({
      text: "Manage Consoles",
      sref: "app.hardware.console.list",
    });
  }
})();
