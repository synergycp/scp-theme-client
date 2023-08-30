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
  function ServerAssignCtrl(Api, ServerAssignModal) {
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
