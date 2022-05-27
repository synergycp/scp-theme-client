(function () {
  "use strict";

  angular
    .module("app.user.client.super.list")
    .component("superClientTable", {
      require: {
        list: "^list",
      },
      bindings: {
        showEmail: "=?",
        showActions: "=?",
      },
      controller: "SuperClientTableCtrl as table",
      transclude: true,
      templateUrl: "app/user/client/super/list/list.table.html",
    })
    .controller("SuperClientTableCtrl", SuperClientTableCtrl);

  /**
   * @ngInject
   */
  function SuperClientTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showEmail: true,
        showActions: true,
      });
    }
  }
})();
