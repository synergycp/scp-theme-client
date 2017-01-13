(function () {
  'use strict';

  angular
    .module('app.user.client.super.list.filters')
    .component('superClientFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'SuperClientFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/user/client/super/list/filters/filters.html'
    })
    ;
})();
