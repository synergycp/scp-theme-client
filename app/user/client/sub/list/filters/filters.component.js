(function () {
  'use strict';

  angular
    .module('app.user.client.sub.list.filters')
    .component('subClientFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'SubClientFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/user/client/sub/list/filters/filters.html'
    })
    ;
})();
