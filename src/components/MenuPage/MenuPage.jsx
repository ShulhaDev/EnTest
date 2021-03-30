import React from 'react'
import {useHistory} from "react-router-dom";
import styles from './MenuPage.module.css';
import ActionLabel from "../Common/ActionLabel/ActionLabel";
import {info} from "../Common/EventSponge/EventSponge"

const MenuPage = ({user}) => {
    let history = useHistory();

    if(!user) {
        info("I don't know you");
        return null;
    }

    let adminSection = user.isAdmin? <ActionLabel onClick={() => history.push('/vocabulary')}>Words</ActionLabel>:'';
    let headerSection = (
                `Welcome, ${user.name}`
    );
    let menuSection = (
        <fieldset className={"list"}>
            <legend align="center" className={styles.changeUser + ' highlighted' } onClick={()=> history.push('/loginPage')}>{headerSection}</legend>
            {adminSection}
            <ActionLabel onClick={()=>history.push('/learnPage')}>Learn</ActionLabel>
            <ActionLabel onClick={()=>history.push('/testSelectPage')}>Test</ActionLabel>
        </fieldset>
    )
    return(
        <div>
            {menuSection}
        </div>
    );
}

export default MenuPage;