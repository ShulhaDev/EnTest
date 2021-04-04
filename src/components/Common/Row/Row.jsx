import React from 'react'
import styles from "./Row.module.scss";

const  Row = (props) => <div className={styles.buttons}>{props.children}</div>

export default Row;