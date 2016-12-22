(function () {
  'use strict';

  angular
    .module('app.user.client.super')
    .service('SuperClient', SuperClientService);

  /**
   * SuperClient Service
   *
   * @ngInject
   */
  function SuperClientService (Api, $httpParamSerializer) {
    var SuperClient = this;
    var $sso = Api.all('sso');
    var $key = Api.all('key');

    SuperClient.loginAs = loginAs;
    SuperClient.makeApiKey = makeApiKey;

    //////////

    function makeApiKey(clientId) {
      return $key.post({
        owner_id: clientId,
        owner_type: 'client',
      });
    }

    function loginAs(clientId, options) {
      return makeApiKey(clientId)
        .then(sso)
        ;

      function sso(apiKey) {
        var queryData = _.assign({
          key: apiKey.key,
        }, options || {});
        var url = $sso.getRestangularUrl(
          '?'+$httpParamSerializer(queryData)
        );

        window.open(url, '_blank');
      }
    }
  }
})();
