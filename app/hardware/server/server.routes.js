(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($urlRouterProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $urlRouterProvider.otherwise('/hardware/server');

    helper
      .state('app.hardware.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:server'),
      })
      .state('app.hardware.server.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.server.view.manage', {
        url: '?bandwidth.start&bandwidth.end',
        title: 'Manage Server',
        reloadOnSearch: false,
        controller: 'ServerManageCtrl as vm',
        templateUrl: helper.basepath('hardware/server/manage/manage.html'),
        resolve: helper.resolveFor(
          'chart-js', 'after:ng-chart-js',
          'moment', 'after:date-range-picker',
          'lang:os-reload', 'lang:bandwidth',
          'numeral'
        ),
      })
      ;
    helper.sso
      .map('server', function ($state, options) {
        return $state.href(
          'app.hardware.server.'+(options.id ? 'view' : 'list'), {
          id: options.id,
        });
      })
      ;
  }
})();
