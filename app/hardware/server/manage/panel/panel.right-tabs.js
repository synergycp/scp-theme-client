(function () {
  'use strict';

  var PANELS = 'app/hardware/server/manage/panel';

  angular
    .module('app.hardware.server.manage')
    .factory('ManageServer.Panel.RightTabs', ManageServerRightTabs)
    ;
    
  /**
   * @ngInject
   */
  function ManageServerRightTabs(ServerManage) {
    var server = ServerManage.getServer();
    return server.access.is_active ? _.filter([
      server.access.switch && {
        name: 'control.switch',
        templateUrl: PANELS + '/panel.control.switch.html'
      }, server.access.ipmi && {
        name: 'control.ipmi',
        templateUrl: PANELS + '/panel.control.ipmi.html'
      }, server.access.pxe && {
        name: 'pxe',
        templateUrl: PANELS + '/panel.os-reload.html'
      },
    ]) : [];
    
  }
})();
