(function () {
  angular.module('app.user.account')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.account', {
        url: '/account',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:account'),
      })
      .state('app.user.account.settings', {
        url: '',
        title: 'Account',
        templateUrl: helper.basepath('user/account/account.html'),
        controller: 'UserAccountCtrl as vm',
      })
      ;
  }
})();
