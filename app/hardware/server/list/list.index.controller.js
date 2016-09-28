(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerIndexCtrl', ServerIndexCtrl)
    ;

  /**
   * ServerIndex Controller
   *
   * @ngInject
   */
  function ServerIndexCtrl(ServerList, ListFilter) {
    var vm = this;

    vm.list = ServerList();
    vm.filters = ListFilter(vm.list);

    activate();

    ////////////

    function activate() {
    }
  }
})();
