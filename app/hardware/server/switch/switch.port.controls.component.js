(function () {
  'use strict';

  var INTERVAL_CHECK_STATUS = 5 * 1000;

  angular
    .module('app.hardware.server')
    .component('serverSwitchPortControl', {
      require: {},
      bindings: {
        server: '=',
        port: '=',
      },
      controller: 'ServerSwitchPortControlCtrl as portControl',
      transclude: true,
      templateUrl: 'app/hardware/server/switch/switch.port.controls.html'
    })
    .controller('ServerSwitchPortControlCtrl', ServerSwitchPortControlCtrl);

  /**
   * @ngInject
   */
  function ServerSwitchPortControlCtrl(Loader, Modal, Alert) {
    var portControl = this;
    var $command;

    portControl.loader = Loader();
    portControl.response = {
      show: false,
      output: '',
      errors: '',
      loader: Loader(),
    };

    portControl.$onInit = init;
    portControl.power = {
      on: command.bind(null, 'power-on'),
      off: confirmPowerOff,
    };

    //////////

    function init() {
      $command = portControl.port
        .all('command')
        ;
    }

    function confirmPowerOff() {
      return portControl.loader.during(
        Modal
          .confirm([portControl.server], 'server.switch.power.off.confirm')
          .data({
            port: portControl.server.switch.port.name,
          })
          .open()
          .result
          .then(command.bind(null, 'power-off'))
      );
    }

    function command(cmd) {
      return portControl.loader.during(
        $command
          .post({
            'command': cmd,
          })
          .then(alertSuccess)
          .then(fireChangeEvent)
      );
    }

    function alertSuccess(response) {
      Alert.success(
        'Switch command has been queued - please allow up to 30 seconds for the command to take effect.'
      );
    }

    function fireChangeEvent(response) {
      portControl.server.fire('change');

      return response;
    }
  }
})();
