const SHOW_MESSAGE = "SHOW_MESSAGE";
const CLOSE = "CLOSE";

const initialState ={
    messageData: {
        type: "alert",
        text: "",
        visible: null,
        callback: undefined
    }
}

const notificationReducer = (state = initialState,action) =>{
    switch(action.type){
        case SHOW_MESSAGE:
            return Object.assign({},state,{messageData: action.messageData});
        case CLOSE:
            return Object.assign({},state, {messageData: initialState.messageData})
        default: return state;
    }
}

export const show = (messageData) => ({type: SHOW_MESSAGE,messageData});
export const close = () => ({type: CLOSE});

export default notificationReducer;
