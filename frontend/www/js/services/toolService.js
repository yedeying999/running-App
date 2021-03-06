angular.module('starter.services')

.factory('currentHost', function () {
//   return '192.168.0.112:3000';
  // return '127.0.0.1:3000';
  return '115.28.105.173:3000';
//   return '192.168.0.101:3000';
})
.factory('buildUrl', function (currentHost, $rootScope, $cookies, loadCookie) {
  return function (url, params) {
    if (!params) {
      params = {};
    }
    loadCookie();
    if (!params.token && $rootScope.userInfo && $rootScope.userInfo.token) {
      params.token = $rootScope.userInfo.token;
    }

    if (url.slice(-1) === '/') {
      url = url.slice(0, -1);
    }
    url = 'http://' + currentHost + url;
    if (Object.keys(params).length) {
      url += '?' + Object.keys(params).map(function (param) {
        return param + '=' + params[param]
      }).join('&');
    }
    return url;
  };
})
.factory('round', function () {
  return function (num, digit, unit) {
    num = parseFloat(num);
    if (isNaN(num)) {
      return '-';
    }
    if (unit === '%') {
      num *= 100;
    }
    digit = digit || 0;
    num = num.toFixed(digit).toString();
    if (unit) {
      num += unit;
    }
    return num;
  }
});
