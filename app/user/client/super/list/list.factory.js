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
  function SuperClientListFactory (List, ListConfirm, ApiKey, $q) {
    return function () {
      var currentUserId = ApiKey.owner().id;
      var list = List('client/'+currentUserId+'/super');
      var clientList = List('client');
      
      list.confirm = ListConfirm(list, 'client.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);

      var createSuperClient = list.create;
      list.create = function(data) {
        var deferred = $q.defer();
        clientList.create(data).then(function(client) {
          createSuperClient({
            client_id: client.id
          }).then(function(res) {
            deferred.resolve(res);
          }).catch(function(err) {
            deferred.reject(err);
          })
        }).catch(function(err) {
          deferred.reject(err);
        })
        return deferred.promise;
      }

      return list;
    };
  }
})();
