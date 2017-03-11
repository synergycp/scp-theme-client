(function () {
  'use strict';

  var PANELS = 'app/hardware/server/manage/panel';

  angular
    .module('app.hardware.server.manage')
    .config(configurePanels)
    ;

  /**
   * @ngInject
   */
  function configurePanels(ServerManageProvider, _) {
    ServerManageProvider.panels.top.add('ManageServer.Panel.TopTabs');
    ServerManageProvider.panels.right.add('ManageServer.Panel.RightTabs');

    _.each([
      {
        name: 'hardware',
        templateUrl: PANELS + '/panel.hardware.html',
      }, {
        name: 'assign',
        templateUrl: PANELS + '/panel.assign.html',
      }, {
        name: 'notes',
        templateUrl: PANELS + '/panel.notes.html',
      },
    ], ServerManageProvider.panels.left.add);

  }
})();
