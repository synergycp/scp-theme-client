(function () {
  'use strict';

  angular
    .module('app.core')
    .directive('infiniteScroll', infiniteScroll);

  /**
   * @ngInject
   *
   * Minimal replacement for ngInfiniteScroll (not installed in this
   * project). Evaluates the `infinite-scroll` expression when the element
   * it's placed on is scrolled within `infinite-scroll-distance` px
   * (default 20) of its own bottom. Used on ui-select's choices <ul>,
   * which is itself the scrollable element.
   */
  function infiniteScroll($parse) {
    return {
      restrict: 'A',
      link: link,
    };

    function link(scope, element, attrs) {
      var fn = $parse(attrs.infiniteScroll);
      var el = element[0];

      element.on('scroll', onScroll);
      scope.$on('$destroy', function () {
        element.off('scroll', onScroll);
      });

      function onScroll() {
        var distance = parseInt(attrs.infiniteScrollDistance, 10) || 20;
        var remaining = el.scrollHeight - el.scrollTop - el.clientHeight;

        if (remaining > distance) {
          return;
        }

        scope.$apply(function () {
          fn(scope);
        });
      }
    }
  }
})();
