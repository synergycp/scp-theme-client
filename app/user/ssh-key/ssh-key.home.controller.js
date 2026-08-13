(function () {
  'use strict';

  angular
    .module('app.user.ssh-key')
    .controller('ClientSSHKeyHomeCtrl', ClientSSHKeyHomeCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientSSHKeyHomeCtrl(Api, Loader, Alert, Modal, $uibModal) {
    var vm = this;
    var $api = Api.all('/ssh-key');

    vm.loader = Loader();
    vm.keys = [];
    vm.form = { name: '', public_key: '' };
    vm.add = add;
    vm.remove = remove;
    vm.view = view;

    activate();

    //////////

    function activate() {
      refresh();
    }

    function refresh() {
      return vm.loader.during(
        $api.getList().then(function (items) {
          vm.keys = items;
        })
      );
    }

    function add() {
      if (!vm.form.name || !vm.form.public_key) {
        return Alert.warning('Please provide a name and an SSH public key.');
      }
      return vm.loader.during(
        $api.post({ name: vm.form.name, public_key: vm.form.public_key })
          .then(function () {
            vm.form = { name: '', public_key: '' };
          })
          .then(refresh)
      );
    }

    function view(key) {
      return $uibModal.open({
        templateUrl: 'app/user/ssh-key/ssh-key.detail.html',
        controller: 'ClientSSHKeyDetailCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          sshKey: function () {
            return key;
          },
        },
      });
    }

    function remove(key) {
      return Modal.confirm([{ name: key.name }], 'ssh-key.delete.confirm')
        .open()
        .result
        .then(function () {
          return vm.loader.during(key.remove().then(refresh));
        });
    }
  }
})();
