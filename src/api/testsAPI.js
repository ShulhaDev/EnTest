import {instance} from "./axiosInstance";

const testsAPI =  {
    loadTests: (user) => {
        return instance.get('tests',{params: {user_id: (user.isAdmin? -1 : user.id)}});
    },
    saveTest: (testData) => instance.post('tests/update', {value: testData}),
    removeTest: id => instance.post("tests/remove", {id})
}

export  default testsAPI;