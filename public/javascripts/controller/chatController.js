app.controller('chatController', ['$scope', ($scope) => {
    $scope.onlineUsers = [];
    $scope.activeTab = 2;

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };

    const socket = io.connect("http://67659045.ngrok.io/");

    socket.on('onlineList', users => {
        $scope.onlineUsers = users;
        $scope.$apply();
    });
}]);