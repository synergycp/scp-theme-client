(function () {
  angular
    .module('app.user.client.super')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.super', {
        url: '/:client/super',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:client'),
      })
      ;

    // helper.url.map('super', function ($state, id) {
    //   return 'super';
    // });
  }
})();
