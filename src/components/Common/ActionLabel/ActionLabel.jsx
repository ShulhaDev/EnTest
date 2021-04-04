import React from 'react'
import styles from './ActionLabel.module.scss'
const ActionLabel = ({children,inactive,...props}) => <label className={inactive? styles.inactive : styles.interactive} {...props} > {children} </label>

export default ActionLabel;