(function () {
  'use strict';

  angular
    .module('app.user.client.list')
    .factory('ClientList', ClientListFactory)
    ;

  /**
   * ClientList Factory
   *
   * @ngInject
   */
  function ClientListFactory(
    List
  ) {
    return function () {
      var list = List('client').filter({
        not_me: true,
      });

      return list;
    };
  }
})();
