(function () {
  'use strict';

  angular
    .module('app.user.client.sub.list')
    .controller('SubClientIndexCtrl', SubClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function SubClientIndexCtrl(SubClientList, ListFilter, $state, ApiKey) {
    var vm = this;
    $state.transitionTo($state.current.name, {client: ApiKey.owner().id}, { notify: false, inherit: true, location: 'replace'});

    vm.list = SubClientList();
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
