(function () {
  'use strict';

  angular
    .module('app.user')
    .config(SidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SidebarConfig(SidebarProvider) {
    SidebarProvider.group('user', {
      translate: "sidebar.USERS",
      sref: "app.user.account",
      icon: "fa fa-user",
    }).item({
      text: "My Account",
      sref: "app.user.account",
    }).item({
      text: "Sub Clients",
      sref: "app.user.client",
    });
  }
})();
