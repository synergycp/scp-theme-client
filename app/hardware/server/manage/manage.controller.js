(function () {
  'use strict';

  var PANELS = 'app/hardware/server/manage/panel';

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
    var panelContext = {};

    vm.server = {
      id: $stateParams.id,
      load: loadServer,
    };
    EventEmitter().bindTo(vm.server);
    panelContext.server = vm.server;

    vm.panels = {
      top: [],
      left: [],
      right: [],
    };

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
      _.setContents(vm.panels.top, [
        ServerManagePanelBandwidth(vm.server, $scope),
      ]);

      _.setContents(vm.panels.left, [{
        templateUrl: PANELS+'/panel.hardware.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.assign.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.notes.html',
        context: panelContext,
      },]);

      if (vm.server.access.is_active) {
        _.setContents(vm.panels.right, _.filter([vm.server.access.switch && {
          templateUrl: PANELS+'/panel.control.switch.html',
          context: panelContext,
        }, vm.server.access.ipmi && {
          templateUrl: PANELS+'/panel.control.ipmi.html',
          context: panelContext,
        }, vm.server.access.pxe && {
          templateUrl: PANELS+'/panel.os-reload.html',
          context: panelContext,
        },]));
      }
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
