app.controller('chatController', ['$scope', ($scope) => {
    /**
     * Angular variables
     */
    $scope.onlineUsers = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.roomClicked = false;
    $scope.roomName = "";
    $scope.roomId = "";
    $scope.message = "";

    /**
     * Socket.io event handling.
     */
    const socket = io.connect("http://67659045.ngrok.io/");
    socket.on('onlineList', users => {
        $scope.onlineUsers = users;
        $scope.$apply();
    });

    socket.on('roomList', rooms => {
        $scope.roomList = rooms;
        $scope.$apply();
    });

    $scope.newMessage = () => {
        socket.emit('newMessage', {
            message : $scope.message,
            roomId : $scope.roomId
        })
        $scope.message = "";
    };

    $scope.switchRoom = room => {
        $scope.roomName = room.name;
        $scope.roomId = room.id;
        $scope.roomClicked = true;
    };

    $scope.newRoom = () => {
        //let randomName = Math.random().toString(36).substring(7);

        let roomName = window.prompt("Enter room name");
        if (roomName !== '' && roomName !== null) {
            socket.emit('newRoom', roomName);
        }
    };

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };
}]);