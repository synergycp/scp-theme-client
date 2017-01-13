(function () {
  'use strict';

  var INPUTS = {
    email: '',
    first: '',
    last: '',
    acknowledged: false
  };

  angular
    .module('app.user.client.super')
    .component('superClientForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'SuperClientFormCtrl as superClientForm',
      transclude: true,
      templateUrl: 'app/user/client/super/superClient.form.html'
    })
    .controller('SuperClientFormCtrl', SuperClientFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SuperClientFormCtrl() {
    var superClientForm = this;

    superClientForm.$onInit = init;

    //////////

    function init() {
      superClientForm.form.getData = getData;
      superClientForm.input = superClientForm.form.input = superClientForm.form.input || {};
      _.assign(superClientForm.input, INPUTS);
    }

    function getData() {
      return _.clone(superClientForm.input);
    }
  }
})();
