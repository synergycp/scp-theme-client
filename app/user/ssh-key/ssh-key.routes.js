(function () {
  angular
    .module('app.user.ssh-key')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.ssh-key', {
        url: '/ssh-key',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.user.ssh-key.home', {
        url: '',
        title: 'SSH Public Keys',
        controller: 'ClientSSHKeyHomeCtrl as vm',
        templateUrl: helper.basepath('user/ssh-key/ssh-key.home.html'),
        resolve: helper.resolveFor('lang:ssh-key'),
      })
      ;
  }
})();
