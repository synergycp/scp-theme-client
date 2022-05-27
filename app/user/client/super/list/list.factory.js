(function () {
  "use strict";

  angular
    .module("app.user.client.super.list")
    .factory("SuperClientList", SuperClientListFactory);

  /**
   * SuperClientList Factory
   *
   * @ngInject
   */
  function SuperClientListFactory(
    List,
    ListConfirm,
    ApiKey,
    Alert,
    ClientModal
  ) {
    return function () {
      if (!ApiKey.owner()) {
        return;
      }

      var currentUserId = ApiKey.owner().id;
      var list = List("client/" + currentUserId + "/super");
      var clientList = List("client");

      list.confirm = ListConfirm(list, "client.super.modal.delete");
      list.bulk.add("Send Email", function (clients) {
        return ClientModal.sendEmail(clients).open().result;
      });
      list.bulk.add("Delete", list.confirm.delete);

      var createSuperClient = list.create;
      list.create = function (data) {
        if (!data.acknowledged) {
          return Alert.warning(
            "Please check the acknowledgment box to add this Super Client"
          );
        }
        return clientList.create(data).then(function (client) {
          return createSuperClient({
            client_email: data.email,
          });
        });
      };

      return list;
    };
  }
})();
