import React from 'react'
import styles from './Cleaner.module.scss'

const Cleaner = props => {
    return (
        <div className={styles.container}>
            {props.children}
            <span className={styles.trigger} title="clear field" onClick={props.cleanerFn}>🗙</span>
        </div>
    );
}

export default Cleaner;