(function () {
  'use strict';

  angular
    .module('app.user.account')
    .component('accountInfo', {
      require: {
      },
      bindings: {
      },
      controller: 'AccountInfoCtrl as info',
      transclude: true,
      templateUrl: 'app/user/account/account.info.html'
    })
    .controller('AccountInfoCtrl', AccountInfoCtrl)
    ;

  /**
   * @ngInject
   */
  function AccountInfoCtrl(Auth) {
    var info = this;

    info.$onInit = init;
    info.user = Auth.user();

    //////////

    function init() {
      info.user
        .get()
        .then(storeUser)
        ;
    }

    function storeUser(user) {
      return _.assign(info.user, user);
    }
  }
})();
