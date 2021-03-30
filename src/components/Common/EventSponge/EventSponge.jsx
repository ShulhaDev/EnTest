import React from "react"
import {dispatch} from "../../../redux/redux-store"
import styles from "./EventSponge.module.css"
import {show} from "../../../redux/reducers/notification-reducer";



export const confirm = (text,callback) => {
    dispatch(show({
        type: "confirm",
        text,
        visible: true,
        callback
    }))
};

export const info = (text) => {
    dispatch(show({
        type: "alert",
        text,
        visible: true,
        callback: undefined
    }))
};

const EventSponge = ({messageData,close}) => {
    const terminate = () => {
        close();
    }
    const options = messageData.type === "confirm"
        ? <React.Fragment>
            <button className={styles.action} onClick={() =>{ messageData.callback(); terminate();}}>Yes</button>
            <button className={styles.action} onClick={() => { terminate();}}>Forget it</button>
        </React.Fragment>
        : <div className={styles.ok}><button className={styles.action} onClick={()=>{if(messageData.callback) messageData.callback(); terminate();}}>Ok</button></div>;
   return messageData.visible && (
        <div className={styles.major}>
            <div className={styles.sponge}>
                <label className={styles.message}>{messageData.text}</label>
                {options}
            </div>
        </div>
    );
}
export default EventSponge;
