(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .service('ServerAssignModal', ServerAssignModalService);

  /**
   * ServerAssignModal Service
   *
   * @ngInject
   */
  function ServerAssignModalService ($uibModal, $q, Api) {
    var ServerAssignModal = this;
    var $api = Api.all('server');

    ServerAssignModal.client = client;
    ServerAssignModal.suspend = suspend;

    //////////

    function suspend(servers) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.suspend.html',
        controller: 'ServerAssignSuspendModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
        },
      });

      return modal.result.then(patchServerAccesses);

      function patchServerAccesses() {
        return $q.all(
          _.map(servers, patchAccess)
        );

        function patchAccess(server) {
          if (!server.access.sub) {
            return;
          }

          var $access = server
            .all('access')
            .one(''+server.access.sub.id);

          return $access.patch({ is_active: false })
            .then(saveAccessResponse.bind(null, server));
        }
      }
    }

    /**
     * Updates items' clients in-place after.
     *
     * @return {Promise} Selected Client
     */
    function client(servers, access) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.client.html',
        controller: 'ServerAssignClientModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
          access: function () {
            return typeof access !== "undefined" ?
              access :
              ((_.find(servers, 'access.sub') || {}).access || {}).sub;
          },
        },
      });

      return modal.result.then(function (access) {
        var accessData = !access ? null : {
          client: {
            id: access.client.id,
          },
          pxe: access.pxe,
          ipmi: access.ipmi,
          switch: access.switch,
        };

        return $q.all(
          _.map(servers, patchAccess)
        );

        function patchAccess(server) {
          var sub = server.access.sub;
          if (sub) {
            var $access = server
              .all('access')
              .one(''+sub.id);

            if (access && sub.client.id == access.client.id) {
              return $access.patch(accessData)
                .then(saveAccessResponse.bind(null, server));
            }

            return $access
              .remove()
              .then(create.bind(null, server));
          }

          return create(server);
        }

        function create(server) {
          if (!access) {
            server.access.sub = null;

            return $q.when(null);
          }

          return server
            .all('access')
            .post(accessData)
            .then(saveAccessResponse.bind(null, server))
            ;
        }
      });
    }

    function saveAccessResponse(server, response) {
      if (!response.id) {
        server.access.sub = null;

        return response;
      }

      server.access.sub = server.access.sub || response;
      _.assign(server.access.sub, response);

      return response;
    }

    function $bulk(servers) {
      var serverIds = _.map(servers, 'id').join(',');

      return $api.one(serverIds);
    }
  }
})();
