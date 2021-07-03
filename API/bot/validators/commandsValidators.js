let CommandValidators = {
    checkUser: function(user){
        let bool = false
        //let listUsers = getListUsers();
        let listUsers = ["eriau", "bourdu", "zennyth"]
        if (user !== undefined){
            if (listUsers.includes(user.toLowerCase())){
                bool = true
            }
        }
        return bool
    },
    checkArguments: function(nbArguments, message){
        let bool = false
        if (message !== undefined){
            let nbArgumentsActual = message.match(/(\w+)/g). length
            if (nbArguments === nbArgumentsActual){
                bool = true
            }
        }
        return bool
    }
}

module.exports = CommandValidators