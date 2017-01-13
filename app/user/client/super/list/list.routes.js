(function () {
  angular
    .module('app.user.client.super.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.super.list', {
        url: '?q',
        title: 'Super Clients',
        controller: 'SuperClientIndexCtrl as vm',
        templateUrl: helper.basepath('user/client/super/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
