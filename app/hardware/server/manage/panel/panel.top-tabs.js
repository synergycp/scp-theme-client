(function () {
  'use strict';

  angular
    .module('app.hardware.server.manage')
    .factory('ManageServer.Panel.TopTabs', TopTabsPanel)
    ;
    
  /**
   * @ngInject
   */
  function TopTabsPanel(ServerManage, ServerManagePanelBandwidth) {
    return ServerManagePanelBandwidth(
      ServerManage.getServer(),
      ServerManage.getControllerScope()
    );
  }
})();
