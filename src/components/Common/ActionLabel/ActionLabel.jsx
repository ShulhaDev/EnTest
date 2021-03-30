import React from 'react'
import styles from './ActionLabel.module.css'
const ActionLabel = ({children,...props}) => <label className={styles.interactive} {...props}> {children} </label>

export default ActionLabel;