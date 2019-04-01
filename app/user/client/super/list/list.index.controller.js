(function () {
  'use strict';

  angular
    .module('app.user.client.super.list')
    .controller('SuperClientIndexCtrl', SuperClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function SuperClientIndexCtrl(SuperClientList, ListFilter, $state, $scope, ApiKey, EventEmitter) {
    var vm = this;
    $state.transitionTo($state.current.name, {client: ApiKey.owner().id}, { notify: false, inherit: true, location: 'replace' });

    vm.list = SuperClientList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

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
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData())
        .then(vm.create.fire.bind(null, 'created'));
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
