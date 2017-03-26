(function () {
  angular
    .module('app.user.client.sub')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.sub', {
        url: '/sub',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:client'),
      })
      ;

    // helper.url.map('sub', function ($state, id) {
    //   return 'sub';
    // });
  }
})();
