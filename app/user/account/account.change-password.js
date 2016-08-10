(function () {
  'use strict';

  angular
    .module('app.user.account')
    .component('changePassword', {
      require: {
      },
      bindings: {
      },
      controller: 'ChangePasswordCtrl as changePassword',
      transclude: true,
      templateUrl: 'app/user/account/account.change-password.html'
    })
    .controller('ChangePasswordCtrl', ChangePasswordCtrl)
    ;

  /**
   * @ngInject
   */
  function ChangePasswordCtrl(Auth) {
    var changePassword = this;

    changePassword.$onInit = init;
    changePassword.submit = submit;
    changePassword.input = {
      password: '',
      confirm: '',
    };

    //////////

    function init() {
    }

    function submit() {
      Auth.user().patch({
        password: changePassword.input.password,
      });
    }
  }
})();
