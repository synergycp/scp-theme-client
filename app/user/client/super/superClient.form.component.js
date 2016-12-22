(function () {
  'use strict';

  var INPUTS = {
  };

  angular
    .module('app.user')
    .component('superClientForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'SuperClientFormCtrl as superClientForm',
      transclude: true,
      templateUrl: 'app/user/client/super/superClient.form.html',
    })
    .controller('SuperClientFormCtrl', SuperClientFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SuperClientFormCtrl(Select) {
    var superClientForm = this;

    superClientForm.$onInit = init;
    superClientForm.input = _.clone(INPUTS);
    superClientForm.client = Select('client');

    //////////

    function init() {
      superClientForm.form.getData = getData;
      fillFormInputs();

      (superClientForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      var data = _.clone(superClientForm.input);
      
      data.client = {
        id: superClientForm.client.getSelected('id'),
      };

      return data;
    }

    function fillFormInputs() {
      _.overwrite(superClientForm.input, superClientForm.form.input);
    }
  }
})();
