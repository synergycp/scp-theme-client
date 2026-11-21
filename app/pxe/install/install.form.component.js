(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .component('pxeInstallForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PxeInstallFormCtrl as pxeInstallForm',
      transclude: true,
      templateUrl: 'app/pxe/install/install.form.html'
    })
    .controller('PxeInstallFormCtrl', PxeInstallFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PxeInstallFormCtrl(Select, OsReloadModals, Api, Alert, $scope, _, $rootScope) {
    var pxeInstallForm = this;

    pxeInstallForm.$onInit = init;
    pxeInstallForm.server = Select('server').on('change', syncServer);
    pxeInstallForm.isEnabled = true;
    pxeInstallForm.canRAID = false;
    pxeInstallForm.disks = [];
    pxeInstallForm.diskChoices = [];
    pxeInstallForm.isDiskIndexHidden = isDiskIndexHidden;
    pxeInstallForm.submit = submit;
    pxeInstallForm.input = {
      profile: Select('pxe/profile').on('change', syncProfile),
      disk: {
        raid: 'None',
        index: 0,
      },
      edition: null,
      licenseKey: '',
      password: '',
    };


    //////////

    function init() {
      pxeInstallForm.form.on('reload_server', function(server) {
        pxeInstallForm.server.setSelectedId(server.id);
      })
    }

    function syncServer(server) {
      server.get().then(function (res) {
        pxeInstallForm.isEnabled = res.is_pxe_ready;
        pxeInstallForm.canRAID = res.raid_soft_ready;
        syncDiskChoices(res.disks || []);
      });
    }

    function syncDiskChoices(disks) {
      pxeInstallForm.disks = disks;
      pxeInstallForm.diskChoices = _.map(disks, function (disk, index) {
        return {
          index: index,
          number: index + 1,
          name: disk.name,
        };
      });

      if (pxeInstallForm.input.disk.index >= disks.length) {
        pxeInstallForm.input.disk.index = 0;
      }
    }

    /**
     * A RAID across two identical disks uses both of them, so there is
     * nothing to choose.
     */
    function isDiskIndexHidden() {
      var disks = pxeInstallForm.disks;

      return pxeInstallForm.input.disk.raid !== 'None' &&
        disks.length === 2 &&
        disks[0].id === disks[1].id;
    }

    function syncProfile(profile) {
      if (profile.iso) {
        pxeInstallForm.input.edition = Select('pxe/iso/' + profile.iso.id + '/edition')
          .on('change', syncEdition);
      } else {
        pxeInstallForm.input.edition = null;
      }
    }

    function syncEdition(edition) {
      pxeInstallForm.input.licenseKey = edition.key || pxeInstallForm.input.licenseKey;
    }

    function submit() {
      var profile = pxeInstallForm.input.profile.selected;
      var edition = (pxeInstallForm.input.edition || {}).selected;
      var raid = pxeInstallForm.input.disk.raid !== 'None' && pxeInstallForm.canRAID ? pxeInstallForm.input.disk.raid : undefined;
      var index = isDiskIndexHidden() ? 0 : pxeInstallForm.input.disk.index;

      if (!profile) {
        return Alert.warning('Please select an OS Reload Profile.');
      }

      if (profile.iso && !edition) {
        return Alert.warning('Please select an OS Edition.');
      }

      OsReloadModals.openCreate({
        isLive: !!profile.is_live,
        loadSshKeys: function () {
          return Api.all('/ssh-key').getList().then(function (items) {
            return {
              keys: items.map(function (k) {
                return { id: k.id, name: k.name, fingerprint: k.fingerprint };
              }),
              client_assigned: true,
            };
          });
        },
      }).result.then(function (result) {
        create({
          pxe_profile_id: profile.id,
          disk: {
            raid: raid,
            index: index,
          },
          queue: true,
          edition_id: (edition || {}).id,
          license_key: pxeInstallForm.input.licenseKey,
          login_type: result.login_type,
          ssh_key_ids: result.ssh_key_ids,
          ssh_keys_raw: result.ssh_keys_raw,
          password: result.password,
        })
      });
    }

    function create(data) {
      return pxeInstallForm.server.selected
        .all('install')
        .post(data)
        .branch()
        .then(fireChangeEvent)
        .unbranch()
    }
    function fireChangeEvent() {
      pxeInstallForm.form.fire('created');
    }
  }
})();
