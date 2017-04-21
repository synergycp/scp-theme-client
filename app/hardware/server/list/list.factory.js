(function () {
  'use strict';

  angular
    .module('app.hardware.server.list')
    .factory('ServerList', ServerListFactory);

  /**
   * ServerList Factory
   *
   * @ngInject
   */
  function ServerListFactory(
    List,
    ServerAssign
  ) {
    return function () {
      var list = List('server');

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
