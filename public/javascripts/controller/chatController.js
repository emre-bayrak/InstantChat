app.controller('chatController', ['$scope', ($scope) => {
    $scope.activeTab = 2;

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };

    const socket = io.connect("http://67659045.ngrok.io/");
}]);