(function () {
  'use strict';

  angular
    .module('app.user.client.super.list')
    .factory('SuperClientList', SuperClientListFactory)
    ;

  /**
   * SuperClientList Factory
   *
   * @ngInject
   */
  function SuperClientListFactory (List, ListConfirm, ApiKey) {
    return function () {
      var currentUserId = ApiKey.owner().id;
      var list = List('client/'+currentUserId+'/super');
      
      list.confirm = ListConfirm(list, 'client.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
