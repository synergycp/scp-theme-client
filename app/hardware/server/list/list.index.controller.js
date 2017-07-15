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
  function ServerIndexCtrl(ServerList, ListFilter, $scope, $state) {
    var vm = this;

    vm.list = ServerList();
    vm.filters = ListFilter(vm.list);
    vm.filters.on('change', setStateParams);

    activate();

    ////////////

    function activate() {
      $scope.$on('$locationChangeSuccess', setFilters);

      setFilters();
    }

    function setStateParams() {
      $state.go($state.current.name, vm.filters.current, {location: 'replace'});
    }

    function setFilters() {
      vm.filters.add({
        client: $state.params.client,
        q: $state.params.q,
      });
    }
  }
})();
