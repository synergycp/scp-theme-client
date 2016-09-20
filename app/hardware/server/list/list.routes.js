(function () {
  'use strict';

  var DIR = 'hardware/server/list/';

  angular
    .module('app.hardware.server.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.server.list', {
        url: '?client&q',
        title: 'Servers',
        controller: 'ServerIndexCtrl as vm',
        templateUrl: helper.basepath(DIR+'list.index.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker'
        ),
      })
      ;
  }
})();
