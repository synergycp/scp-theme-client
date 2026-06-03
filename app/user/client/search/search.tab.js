(function () {
  "use strict";

  angular
    .module("app.user.client.search")
    .factory("ClientSearchTab", ClientSearchTabFactory)
    .run(addClientSearchTab);

  /**
   * Add the ClientSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addClientSearchTab(Search, ClientSearchTab, Auth) {
    var tab;
    Auth.whileLoggedIn(add, remove);

    function add() {
      Search.tab.add((tab = ClientSearchTab()));
    }

    function remove() {
      Search.tab.remove(tab);
    }
  }

  /**
   * ClientSearchTab Factory
   *
   * @ngInject
   */
  function ClientSearchTabFactory(SubClientList, ListFilter, RouteHelpers) {
    return function () {
      var list = SubClientList();
      return new ClientSearchTab(list, ListFilter(list), RouteHelpers);
    };
  }

  function ClientSearchTab(list, filter, RouteHelpers) {
    var tab = this;

    tab.list = list;
    tab.filter = filter;
    tab.name = "clients";
    tab.lang = "client";
    tab.text = "client.search.TITLE";
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.results = {
      url: RouteHelpers.basepath("user/client/search/search.tab.html"),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      "user/client/search/search.item.html"
    );

    //////////

    function getState() {
      return "app.hardware.server.list";
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }
  }
})();
