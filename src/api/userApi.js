import {instance} from "./axiosInstance";

const userApi = {
    checkUser: pair => {
        if(pair)
            return instance.get('users/check',{params: pair});
    },
    saveUser: userInfo => instance.post('users/add', {userInfo})
}

export default userApi;