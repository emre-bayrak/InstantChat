app.controller('chatController', ['$scope', 'userFactory', 'chatFactory', 'env', ($scope, userFactory, chatFactory, env) => {
    /**
     * Initilization
     */
    
     function init(){
         userFactory.getUser().then( user => {
             $scope.user = user;
         });
     }

     init();
    /**
     * Angular variables
     */
    $scope.onlineUsers = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.roomClicked = false;
    $scope.loadingMessages = false;
    $scope.roomName = "";
    $scope.roomId = "";
    $scope.message = "";
    $scope.messages = [];

    $scope.user = {};

    /**
     * Socket.io event handling.
     */
    const socket = io.connect(env.SERVICE_URL);
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
        $scope.loadingMessages = true;

        chatFactory.getMessages(room.id).then(data => {
            $scope.messages[room.id] = data;
            $scope.loadingMessages = false;
        });
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