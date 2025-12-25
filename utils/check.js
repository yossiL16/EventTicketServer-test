export function checkExist(data,username){

    for(const user of data) {
        if(data.length < 1){
            return false
        }
        if(user.username === username){
            return true
        }
    }
    return false
}

