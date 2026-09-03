(function () {
  'use strict';

  angular
    .module('app.user.ssh-key')
    .controller('ClientSSHKeyDetailCtrl', ClientSSHKeyDetailCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientSSHKeyDetailCtrl(sshKey) {
    var modal = this;
    modal.key = sshKey;
  }
})();
