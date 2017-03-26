(function () {
  'use strict';

  angular
    .module('app.user.client.search')
    .factory('ClientSearchTab', ClientSearchTabFactory)
    .run(addClientSearchTab)
    ;

  /**
   * Add the ClientSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addClientSearchTab(Search, ClientSearchTab) {
    Search.tab.add(ClientSearchTab());
  }

  /**
   * ClientSearchTab Factory
   *
   * @ngInject
   */
  function ClientSearchTabFactory ($state, SubClientList, ListFilter, RouteHelpers) {
    return function () {
        var list = SubClientList();
        return new ClientSearchTab(
          list,
          $state,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function ClientSearchTab (list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.list = list;
    tab.filter = filter;
    tab.name = 'clients';
    tab.lang = 'client';
    tab.text = 'client.search.TITLE';
    tab.select = onSelect;
    tab.results = {
      url: RouteHelpers.basepath('user/client/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'user/client/search/search.item.html'
    );

    //////////

    function onSelect($item, shouldOpenInNewTab, openSelected) {
      openSelected('app.hardware.server.list', {
          id: $item.id,
        }, shouldOpenInNewTab);
    }
  }
})();
