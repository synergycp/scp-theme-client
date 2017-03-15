(function () {
  'use strict';

  angular
    .module('app.hardware.server.manage')
    .controller('ServerManageCtrl', ServerManageCtrl)
    ;

  /**
   * ServerManage Controller
   *
   * @ngInject
   */
  function ServerManageCtrl(
    Api,
    EventEmitter,
    ServerManagePanelBandwidth,
    ServerManage,
    date,
    moment,
    $stateParams,
    $state,
    $scope,
    $q,
    _
  ) {
    var vm = this;
    var $api = Api.all('server').one($stateParams.id);

    vm.server = {
      id: $stateParams.id,
      load: loadServer,
    };
    EventEmitter().bindTo(vm.server);
    vm.panels = ServerManage.renderedPanels;

    activate();

    //////////

    function activate() {
      vm.server
        .load()
        .then(loadPanels)
        ;
    }

    function loadServer() {
      return $api
        .get()
        .then(storeServer)
        ;
    }

    function storeServer(response) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        _.assign(vm.server, response);
        vm.server.patch = patchServer;

        defer.resolve(vm.server);
      });

      return defer.promise;
    }

    function loadPanels() {
      ServerManage.init(vm.server, $scope);
    }

    function patchServer() {
      return $api.patch
        .apply($api, arguments)
        .then(storeServer)
        .then(fireChangeEvent)
        ;
    }

    function fireChangeEvent(arg) {
      vm.server.fire('change', vm.server);

      return arg;
    }
  }
})();
