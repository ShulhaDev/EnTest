import React from 'react'
import styles from "./Row.module.css";

const  Row = (props) => <div className={styles.buttons}>{props.children}</div>

export default Row;