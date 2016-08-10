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
      })
      .state('app.user.account.list', {
        url: '',
        title: 'Account',
        templateUrl: helper.basepath('user/account/account.html'),
        controller: 'UserAccountCtrl as vm',
      })
      ;
  }
})();
