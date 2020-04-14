app.factory('chatFactory', ['$http', ($http) => {
    const getMessages = roomId => {
        return $http({
            url: 'http://67659045.ngrok.io/messages/list',
            method: 'GET',
            params: {
                roomId
            }
        }).then(response => {
            return response.data;
        }, (err) => {
            console.error(err);
        });
    }

    return {
        getMessages
    }
}]);