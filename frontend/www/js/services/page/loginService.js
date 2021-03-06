angular.module('starter.services')

.factory('Login', function ($http, $state, $rootScope, $cookies, buildUrl) {
  return {

    sendUserMsg: function (scope, ionicPopup) {
      var params = {
        email: scope.email,
        password: scope.password
      }
      if (!params.email) {
        ionicPopup.alert({
          title: '邮箱不能为空！'
        });
      } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(params.email)) {
        ionicPopup.alert({
          title: '输入的邮箱格式不正确！'
        });
      } else if (!params.password) {
        ionicPopup.alert({
          title: '密码不能为空！'
        });
      } else if (!/^[a-zA-Z0-9]{6,20}$/.test(params.password)) {
        ionicPopup.alert({
          title: '密码只许为大小写字母或数字，长度6-20！'
        });
        scope.password = '';
      } else {
        $http.post(buildUrl('/login'), params).success(function (res) {
          if (res.status == 0) {
            $rootScope.userInfo = res.userInfo;
            $cookies.put('userInfo', JSON.stringify($rootScope.userInfo));
            scope.email = '';
            scope.password = '';
            scope.confirmPassword = '';
            $state.go('homePage');

          } else {
            ionicPopup.alert({
                 title: res.msg
              });
          }
        })
      }
    },
    jumpRegister: function (scope, ionicPopup) {
      var params = {
        email: scope.email,
        password: scope.password
      }
      if (!params.email) {
        ionicPopup.alert({
          title: '邮箱不能为空！'
        });
      } else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(params.email)) {
        ionicPopup.alert({
          title: '输入的邮箱格式不正确！'
        });
      } else if (!params.password) {
        ionicPopup.alert({
          title: '密码不能为空！'
        });
      } else if(!scope.confirmPassword) {
        ionicPopup.alert({
          title: '确认密码不能为空！'
        });
      } else if (!(/^[a-zA-Z0-9]{6,20}$/.test(params.password) || /^[a-zA-Z0-9]{6,20}$/.test(scope.confirmPassword))) {
          ionicPopup.alert({
          title: '密码只许为大小写字母或数字，长度6-20！'
        });
        scope.password = '';
        scope.confirmPassword = '';
      } else if (params.password != scope.confirmPassword) {
        ionicPopup.alert({
          title: '两次输入的密码不相同，请重新输入！'
        });
        scope.password = '';
        scope.confirmPassword = '';
      } else {
        $http.post(buildUrl('/cacheUser'), params).success(function (res) {
          if (res.status == 0) {
            $rootScope.currentTid = res.tid;
            $state.go('register');
          } else {
            ionicPopup.alert({
              title: res.msg
            });
          }
        })
      }

    }
  }
});
