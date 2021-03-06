angular.module('starter.controllers')

.controller('userInfoCtrl', function ($scope, $rootScope, $cookies, $ionicActionSheet, $timeout, $state, $ionicPopup, $stateParams, UserInfo) {
  if (!$rootScope.userInfo) {
    $rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
  }

  $scope.email = $rootScope.userInfo.email;
  $scope.userArray = UserInfo.getMsg();

  $scope.backHome = function () {
    $scope.nickname = $rootScope.userInfo.nickname;
    $state.go('homePage');
  }

  $scope.show = function(x) {
    UserInfo.show(x, $scope, $ionicPopup);
  };

  $scope.goResetPassword = function () {
    $state.go('resetPassword');
  }
})
