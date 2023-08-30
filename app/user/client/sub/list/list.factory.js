(function () {
  'use strict';

  angular
    .module('app.user.client.sub.list')
    .factory('SubClientList', SubClientListFactory)
    ;

  /**
   * SubClientList Factory
   *
   * @ngInject
   */
  function SubClientListFactory (List, ListConfirm, ApiKey, ClientModal) {
    return function () {
      if (!ApiKey.owner()) {
        return;
      }

      var list = List('client/*/sub');
      var clientList = List('client');
      
      list.confirm = ListConfirm(list, 'client.sub.modal.delete');
      list.bulk.add('Send Email', function (subClients) {
        return ClientModal.sendEmail(subClients.map(function (subClient) {
          return subClient.child;
        })).open().result;
      });
      list.bulk.add('Delete', list.confirm.delete);
      list.transform.add(function (item) {
        item.name = item.child.name;
        item.email = item.child.email;
        item.serversCount = item.child.serversCount;

        return item;
      });

      list.create = function(item) {
        return clientList.create(item, {
          reload: false,
        }).then(function (item) {
          list.fire('create', item);

          return item;
        });
      };
      clientList.propagateTo(list);

      return list;
    };
  }
})();
