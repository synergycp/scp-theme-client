(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($urlRouterProvider, $stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $urlRouterProvider.otherwise('/hardware/server');

    $stateProvider
      .state('app.hardware.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.server.list', {
        url: '?client',
        title: 'Servers',
        controller: 'ServerIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.index.html'),
      })
      .state('app.hardware.server.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:pxe', 'lang:bandwidth'),
      })
      .state('app.hardware.server.view.manage', {
        url: '?bandwidth.start&bandwidth.end',
        title: 'Manage Server',
        reloadOnSearch: false,
        controller: 'ServerManageCtrl as vm',
        templateUrl: helper.basepath('hardware/server/manage/manage.html'),
        resolve: helper.resolveFor(
          'chart-js', 'ng-chart-js',
          'moment', 'numeral', 'date-range-picker'
        ),
      })
      ;
  }
})();
