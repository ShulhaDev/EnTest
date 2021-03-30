import React from 'react'
import styles from './InfoLabel.module.css'

const InfoLabel = (props) => {
    return(
        <label align="center" className={styles[props.sourceType]}>{props.children}</label>
    );
}


export default InfoLabel;