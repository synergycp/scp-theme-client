(function () {
  angular
    .module('app.pxe')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe', {
        url: '/pxe',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:pxe'),
      })
      .state('app.pxe.install', {
        url: '/install',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.install.list', {
        url: '',
        title: 'PXE Installs',
        controller: 'InstallIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/install/install.index.html'),
      })
      ;
  }
})();
