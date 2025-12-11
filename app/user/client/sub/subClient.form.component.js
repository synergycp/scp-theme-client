(function () {
  "use strict";

  var INPUTS = {
    email: "",
    first: "",
    last: "",
    sendEmail: {
      welcome: true,
    },
    password: null,
  };

  angular
    .module("app.user.client.sub")
    .component("subClientForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller: "SubClientFormCtrl as subClientForm",
      transclude: true,
      templateUrl: "app/user/client/sub/subClient.form.html",
    })
    .controller("SubClientFormCtrl", SubClientFormCtrl);

  /**
   * @ngInject
   */
  function SubClientFormCtrl(Api, _) {
    var subClientForm = this;

    subClientForm.$onInit = init;

    //////////

    function init() {
      subClientForm.form.getData = getData;
      subClientForm.input = subClientForm.form.input =
        subClientForm.form.input || {};
      _.assign(subClientForm.input, INPUTS);
      (subClientForm.form.on || function () {})("created", function (result) {
        return (
          subClientForm.input.sendEmail.welcome &&
          Api.all("client/" + result.id + "/email").post({
            type: "client-account-created",
          })
        );
      });
    }

    function getData() {
      return _.clone(subClientForm.input);
    }
  }
})();
