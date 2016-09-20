(function () {
  'use strict';

  var DIR = 'user/client/list/';

  angular
    .module('app.user.client.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.list', {
        url: '?q',
        title: 'Clients',
        controller: 'ClientIndexCtrl as vm',
        templateUrl: helper.basepath(DIR+'list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
