(function () {
  'use strict';

  angular
    .module('app.user.client.super.list')
    .controller('SuperClientIndexCtrl', SuperClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function SuperClientIndexCtrl(SuperClientList, ListFilter, $state) {
    var vm = this;

    vm.list = SuperClientList();
    // vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'client',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
