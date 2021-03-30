import React from 'react'
import styles from "./ColumnDiv.module.css"

const ColumnDiv = (props) => {
    return (
        <div className={styles.column} style={props.style}>
            {props.children}
        </div>
    );
}
export default React.memo(ColumnDiv);