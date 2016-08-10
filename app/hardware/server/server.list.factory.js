(function () {
  'use strict';

  angular
    .module('app.hardware')
    .factory('ServerList', ServerListFactory);

  /**
   * ServerList Factory
   *
   * @ngInject
   */
  function ServerListFactory (
    _,
    List,
    ListConfirm,
    ServerAssign,
    $stateParams
  ) {
    return function () {
      var list = List('server').filter({
        client: $stateParams.client,
      });

      list.bulk.add('Assign Client', handler(ServerAssign.client));
      list.bulk.add('Suspend', handler(ServerAssign.suspend));
      list.bulk.add('Unsuspend', handler(ServerAssign.unsuspend));

      return list;

      function handler(callback) {
        return function () {
          return callback.apply(null, arguments).then(fireChangeEvent);
        };
      }

      function fireChangeEvent(arg) {
        list.fire('change', arg);

        return arg;
      }
    };
  }
})();
