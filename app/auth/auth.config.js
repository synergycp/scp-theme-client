(function () {
  'use strict';

  angular
    .module('app.auth')
    .config(AuthConfig)
    ;

  /**
   * @ngInject
   */
  function AuthConfig(AuthProvider) {
    AuthProvider
      .setLoginType('client')
      .setAfterLoginState('app.hardware.server.list')
      ;
  }
})();
