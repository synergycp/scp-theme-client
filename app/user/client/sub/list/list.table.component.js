(function () {
  'use strict';

  angular
    .module('app.user.client.sub.list')
    .component('subClientTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showEmail: '=?',
        showServerCount: '=?',
        showActions: '=?',
      },
      controller: 'SubClientTableCtrl as table',
      transclude: true,
      templateUrl: 'app/user/client/sub/list/list.table.html'
    })
    .controller('SubClientTableCtrl', SubClientTableCtrl)
  ;

  /**
   * @ngInject
   */
  function SubClientTableCtrl(_) {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showEmail: true,
        showServerCount: true,
        showActions: true,
      });
    }
  }
})();
