/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /**
   * @ngInject
   */
  function AuthLoginController(Auth, Alert) {
    var login = this;

    login.type = 'client';

    activate();

    ////////////////

    function activate() {
      // Bound form data
      login.account = {
        email: "",
        password: ""
      };
      login.form = null;

      // Error message
      login.authMsg = '';

      login.submit = handleForm;
    }

    function handleForm() {
      login.authMsg = '';

      if (!login.form.$valid) {
        // set as dirty if the user click directly to login,
        // so we show the validation messages.
        login.form.email.$dirty = login.form.password.$dirty = true;

        return;
      }

      Alert.clear();

      var remember = false; // TODO

      Auth
        .login(credentials(), remember)
        .catch(handleError)
        ;
    }

    function credentials() {
      return {
        type: login.type,
        email: login.account.email,
        password: login.account.password
      };
    }

    function handleError(error) {
      console.error(error);
    }
  }
})();
