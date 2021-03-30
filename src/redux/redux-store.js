import {applyMiddleware, combineReducers, createStore} from 'redux'
import userReducer from "./reducers/user-reducer";
import vocabularyReducer from "./reducers/vocabulary-reducer";
import notificationReducer from "./reducers/notification-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    userState: userReducer,
    vocabularyState: vocabularyReducer,
    messageState: notificationReducer,
    form: formReducer
});

let store = createStore(reducers,applyMiddleware(thunkMiddleware));

const dispatch = store.dispatch;
export {dispatch}
export default store;

