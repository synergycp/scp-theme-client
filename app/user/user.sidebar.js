(function () {
  'use strict';

  var MY_ACCOUNT = {
    text: "My Account",
    sref: "app.account.settings",
  };

  var SUB_CLIENTS = {
    text: "Sub Clients",
    sref: "app.user.client.sub.list",
  };

  var SUPER_CLIENTS = {
    text: "Super Clients",
    sref: "app.user.client.super.list",
  };

  angular
    .module('app.user')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(Auth, NavProvider, Permission) {
    //Need to import Auth and Permission here. Why doesn't this work? in install.nav.config.js and search.tab.js
    //this is used in seemingly the exact same way.
    var group = NavProvider.group('user', {
      translate: "nav.USERS",
      sref: "app.account.settings",
      icon: "fa fa-user",
    });

    Auth.whileLoggedIn(show, hide);

    function show() {
      Permission
        .map()
        .then(showPermitted)
      ;
    }

    function showPermitted(map) {
      group.item(MY_ACCOUNT);

      // if (showSubAndSuperClientPages) {
        group.item(SUB_CLIENTS);
        group.item(SUPER_CLIENTS);
      // }
    }

    function hide() {
      group.remove(MY_ACCOUNT);
      group.remove(SUB_CLIENTS);
      group.remove(SUPER_CLIENTS);
    }
  }
})();
