(function () {
  'use strict';

  angular
    .module('app.user.client.super.list')
    .controller('SuperClientIndexCtrl', SuperClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function SuperClientIndexCtrl(SuperClientList, ListFilter, $state, ApiKey) {
    var vm = this;
    $state.transitionTo($state.current.name, {client: ApiKey.owner().id}, { notify: false, inherit: true });

    vm.list = SuperClientList();
    vm.filters = ListFilter(vm.list);

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
      vm.list.on('load', function(items) {
        _(items).forEach(function(item) {
          item.name = item.grantee.name;
        })
      })
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
