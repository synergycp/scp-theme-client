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
  function SubClientListFactory (List, ListConfirm, ApiKey) {
    return function () {
      if (!ApiKey.owner()) {
        return;
      }

      var currentUserId = ApiKey.owner().id;
      var list = List('client/'+currentUserId+'/sub');
      var clientList = List('client');
      
      list.confirm = ListConfirm(list, 'client.sub.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);
      list.transform.add(function (item) {
        item.name = item.child.name;

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
