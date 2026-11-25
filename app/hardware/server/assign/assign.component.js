(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverAssign', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerAssignCtrl as assign',
      transclude: true,
      templateUrl: 'app/hardware/server/assign/assign.html'
    })
    .controller('ServerAssignCtrl', ServerAssignCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerAssignCtrl(Api, ServerAssignModal, DirectLogin) {
    var assign = this;

    assign.$onInit = init;
    assign.entities = {
      items: [],
      load: syncEntities,
    };
    assign.client = {
      modal: assignClientModal,
    };
    assign.saveNickname = saveNickname;

    //////////

    function saveNickname() {
      return assign.server.patch({
        nickname: assign.server.nickname,
      });
    }

    function init() {
      assign.entities.load();

      // [BA-404] Clients who were stopped from sharing servers. A client
      // the server is already shared with can still be removed.
      assign.cannotShare = false;
      DirectLogin.accountOptions().then(function (options) {
        assign.cannotShare = options.subClientsDisabled;
      });
    }

    function syncEntities() {
      return Api.all('entity')
        .getList({
          server: assign.server.id,
          include_pool_ips: true,
        })
        .then(storeEntities);
    }

    function storeEntities(entities) {
      _.setContents(assign.entities.items, entities);
    }

    /**
     * @return {Promise} Selected Client
     */
    function assignClientModal() {
      return ServerAssignModal.client([assign.server], assign.server.access.sub);
    }
  }
})();
