(function () {
  'use strict';

  var INPUTS = {
    email: '',
    first: '',
    last: '',
  };

  angular
    .module('app.user.client.sub')
    .component('subClientForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'SubClientFormCtrl as subClientForm',
      transclude: true,
      templateUrl: 'app/user/client/sub/subClient.form.html'
    })
    .controller('SubClientFormCtrl', SubClientFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SubClientFormCtrl() {
    var subClientForm = this;

    subClientForm.$onInit = init;

    //////////

    function init() {
      subClientForm.form.getData = getData;
      subClientForm.input = subClientForm.form.input = subClientForm.form.input || {};
      _.assign(subClientForm.input, INPUTS);
    }

    function getData() {
      return _.clone(subClientForm.input);
    }
  }
})();
