(function () {
  'use strict';

  var MODE = {
    VIEW: 0,
    EDIT: 1,
  };

  angular
    .module('app.layout.editable')
    .component('editable', {
      require: {
      },
      bindings: {
        value: '=',
        onSave: '&?',
      },
      controller: 'EditableCtrl as editable',
      transclude: true,
      templateUrl: 'app/layout/editable/editable.html'
    })
    .controller('EditableCtrl', EditableCtrl)
    ;

  /**
   * @ngInject
   */
  function EditableCtrl(_, Loader) {
    var editable = this;

    editable.$onInit = init;
    editable.loader = Loader();
    editable.submit = submit;
    editable.mode = _.assign({
      value: MODE.VIEW,
    }, MODE);
    editable.setEditMode = setEditMode;

    //////////

    function setEditMode($event) {
      editable.mode.value = +!editable.mode.value;

      $event.stopPropagation();
    }

    function init() {
    }

    function submit() {
      var promise = (editable.onSave || pass)({
        value: editable.value,
      });

      if (promise && typeof promise.then === 'function') {
        return editable.loader.during(
          promise.then(setViewMode)
        );
      }

      setViewMode();

      function setViewMode() {
        editable.mode.value = MODE.VIEW;
      }
    }
  }

  function pass() {}
})();
