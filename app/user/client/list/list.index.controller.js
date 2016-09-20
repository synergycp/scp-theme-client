(function () {
  'use strict';

  angular
    .module('app.user.client')
    .controller('ClientIndexCtrl', ClientIndexCtrl)
    ;

  /**
   * ClientIndex Controller
   *
   * @ngInject
   */
  function ClientIndexCtrl(ClientList, ListFilter) {
    var vm = this;

    vm.list = ClientList();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      input: {},
      submit: create,
    };

    activate();

    ////////////

    function activate() {
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
