app.controller('chatController', ['$scope', ($scope) => {
    $scope.onlineUsers = [];
    $scope.activeTab = 2;

    const socket = io.connect("http://67659045.ngrok.io/");
    socket.on('onlineList', users => {
        $scope.onlineUsers = users;
        $scope.$apply();
    });

    $scope.newRoom = () => {
        let randomName = Math.random().toString(36).substring(7);
        socket.emit('newRoom', randomName);
    };

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };
}]);