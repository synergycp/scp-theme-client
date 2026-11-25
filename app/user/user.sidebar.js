(function () {
  'use strict';

  var SUB_CLIENTS = {
    text: "Sub Clients",
    sref: "app.user.client.sub.list",
  };
  var SUPER_CLIENTS = {
    text: "Super Clients",
    sref: "app.user.client.super.list"
  };

  angular
    .module('app.user')
    .config(NavConfig)
    .run(HideSubClientNav)
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
    }).item(SUB_CLIENTS).item(SUPER_CLIENTS).item({
      text: "SSH Public Keys",
      sref: "app.user.ssh-key.home",
    }).item({
      text: "Manage Consoles",
      sref: "app.hardware.console.list",
    });
  }

  /**
   * [BA-404] A client who was stopped from adding sub clients and super
   * clients only sees those pages while they still have some to remove.
   *
   * @ngInject
   */
  function HideSubClientNav(Auth, ApiKey, Api, DirectLogin, Nav, $q) {
    var group = Nav.group('user');

    Auth.whileLoggedIn(sync);

    //////////

    function sync() {
      DirectLogin.accountOptions().then(function (options) {
        if (!options.subClientsDisabled) {
          return show(true, true);
        }

        var client = 'client/' + (ApiKey.owner() || {}).id;

        return $q.all([
          hasAny(client + '/sub'),
          hasAny(client + '/super'),
        ]).then(function (has) {
          show(has[0], has[1]);
        });
      });
    }

    function hasAny(path) {
      return Api.all(path).getList({ per_page: 1 }).then(function (items) {
        return items.length > 0;
      }, function () {
        // Leave the page reachable when it can't be checked.
        return true;
      });
    }

    function show(subClients, superClients) {
      _.remove(group.submenu, function (entry) {
        return entry.options === SUB_CLIENTS || entry.options === SUPER_CLIENTS;
      });

      // Back in their usual place, after "My Account".
      var entries = [];
      if (subClients) {
        entries.push({ options: SUB_CLIENTS });
      }
      if (superClients) {
        entries.push({ options: SUPER_CLIENTS });
      }

      group.submenu.splice.apply(group.submenu, [1, 0].concat(entries));
    }
  }
})();
