import userApi from "../../api/userApi";
import {info} from "../../components/Common/EventSponge/EventSponge";
import {simpleRequestHandler} from "../../utils/responseHandlers";

const LOGIN_SUBMIT = "LOGIN_SUBMIT";
const CHANGE_USER = "CHANGE_USER";
const USER_SAVED = "USER_SAVED"

const initialState = {
    loggedIn: undefined,
    lastUserSaved: ''
}


const userReducer = (state = initialState,action) => {
    switch (action.type) {
        case LOGIN_SUBMIT:
            let copy = {login: action.userData.name, password: action.userData.password};
            localStorage.setItem("currentUser", JSON.stringify(copy));
            return {...state, loggedIn: action.userData};
        case CHANGE_USER:
            localStorage.removeItem("currentUser");
            return Object.assign({},state,{loggedIn: null});
        case USER_SAVED:
            return Object.assign({},state, {lastUserSaved: action.actual.user});
        default: return state;
    }
}

export const loginAccepted = (userData) => ({type: LOGIN_SUBMIT, userData});
export const logout = () => ({type: CHANGE_USER});
export const userSaved = (actual) => ({type: USER_SAVED,actual})

export const getCurrentUser = () => async (dispatch) => {
    let user;
    let stored = JSON.parse(localStorage.getItem("currentUser"));
    if(!stored) {
        user = undefined;
        return;
    }

    let response = await userApi.checkUser(stored);
    if(response.data.message === "ok"){
        user = response.data.data
        dispatch(loginAccepted(user))
    }
}

export const login = userData => async (dispatch) => {
    let errors = {};
    await simpleRequestHandler(userApi.checkUser(userData),dispatch,loginAccepted,'',
        (err) => {
            errors = {
                _error: (err+'').includes('Network Error')
                    ? "Server is unavailable"
                    : "User data rejected. Unknown login or password"
            }
        })
    return Promise.resolve({errors});
}

export const registerUser = userData => dispatch => {
    if (!userData)
        return Promise.resolve( {errors: {_error: "User data is missing!"}});

    if(!userData.password || userData.password !== userData.confirmPassword)
        return Promise.resolve({errors: {confirmPassword: "Password values don`t match!"}});

     return userApi.saveUser({name: userData.login, password: userData.password}).then( response => {
        if(response.data && response.data.message === "ok"){
            dispatch(userSaved(response.data.data));
            info("User saved successfully")
            return {};
        } else {
            let errors = {
                login: (response.data.error && +response.data.error.errno === 19)
                    ? 'Login already exist. Please, enter another login'
                    : undefined,
                _error: 'User data rejected'
            };
            return Promise.resolve({errors});
        }
    })
}

export default userReducer