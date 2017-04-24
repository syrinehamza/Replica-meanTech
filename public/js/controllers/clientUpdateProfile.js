const updateProfileController = function ($scope, $location, factory) {
    
    $scope.clientUpdateProfileForm = {};

    $scope.clientUpdateProfile = function clientUpdateProfile() {
        factory.clientUpdateProfile($scope.clientUpdateProfileForm)
            .success(function (data) {
               // console.log('SUCCESS =>', data);
            }).error(function (error) {
               // console.log('ERROR =>', error);
            });
    };
};
updateProfileController.$inject = ['$scope', '$location', 'factory'];
App.controller('updateProfileController', updateProfileController);


