(function () {
  angular
    .module('app.user.client.sub.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.sub.list', {
        url: '?q',
        title: 'Sub Clients',
        controller: 'SubClientIndexCtrl as vm',
        templateUrl: helper.basepath('user/client/sub/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
