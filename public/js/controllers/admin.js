const adminController = function ($scope, $location, factory) {
    $scope.formData = {};

    $scope.adminRegister = function adminRegister() {
        factory.adminRegister($scope.formData)
            .success(function (data) {
                alert("Now you can proceed to login.")
            }).error(function (error) {
                alert(error.message);
            });
    }

}

adminController.$inject = ['$scope', '$location', 'factory'];
App.controller('adminController', adminController);