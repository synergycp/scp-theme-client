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
  function ChangePasswordCtrl(Auth, Alert) {
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
      if (!changePassword.input.password) {
        Alert.warning('Please input a password to set.');
        return;
      }

      if (changePassword.input.password != changePassword.input.confirm) {
        Alert.warning('Passwords do not match.');
        return;
      }

      Auth.user().patch({
        password: changePassword.input.password,
      });
    }
  }
})();
