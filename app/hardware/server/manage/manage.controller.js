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
    BandwidthFilter,
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

    var bandwidth = _.assign({
      filter: BandwidthFilter(),
    }, panelContext);

    vm.panels = {
      top: [],
      left: [],
      right: [],
    };

    activate();

    //////////

    function activate() {
      // TODO: load panels while vm.server is loading
      // (causes issue with vm.server properties missing)
      vm.server.load()
        .then(loadPanels);

      $scope.$on('$routeUpdate', syncStateToFilter);
      bandwidth.filter.on('change', syncFilterToState);
    }

    function loadServer() {
      return $api.get()
        .then(storeServer)
        ;
    }

    function storeServer(response) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        // TODO: fix this shit
        _.assign(vm.server, response, {
          get: $api.get,
          all: $api.all,
          one: $api.one,
          patch: patchServer,
          remove: $api.remove,
        });

        defer.resolve(vm.server);
      });

      return defer.promise;
    }

    function loadPanels() {
      syncStateToFilter();

      _.setContents(vm.panels.top, [{
        templateUrl: PANELS+'/panel.bandwidth.html',
        context: bandwidth,
      }]);

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

      _.setContents(vm.panels.right, [{
        templateUrl: PANELS+'/panel.control.switch.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.control.ipmi.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.os-reload.html',
        context: panelContext,
      },]);
    }

    function syncStateToFilter() {
      if (!$stateParams['bandwidth.start']) {
        return;
      }

      bandwidth.filter.setRange(
        moment($stateParams['bandwidth.start'], date.formatDateTime),
        moment($stateParams['bandwidth.end'], date.formatDateTime)
      );
    }

    function syncFilterToState() {
      var filter = bandwidth.filter;
      $state.go($state.current.name, _.assign($stateParams, {
        'bandwidth.start': filter.start.format(date.formatDateTime),
        'bandwidth.end': filter.end.format(date.formatDateTime),
      }));
    }

    function patchServer() {
      return $api.patch
        .apply($api, arguments)
        .then(fireChangeEvent)
        ;
    }

    function fireChangeEvent(arg) {
      vm.server.fire('change', vm.server);

      return arg;
    }
  }
})();
