import React,{useCallback} from 'react'
import styles from './SpongeBtn.module.css'

const SpongeBtn = ({className,children,onClick}) => {
    const action = useCallback((cb)=>{
        onClick();
    },[onClick]);

    return (
        <div className={styles.shadowBox}>
            <button className={styles.btn + ' ' + className}
                    onClick={action}>
                {children}
            </button>
        </div>
    );
}
export default SpongeBtn;