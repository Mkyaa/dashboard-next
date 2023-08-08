import React from 'react'

//styles
import styles from './index.module.css'

const MainHeader = () => {
    return (
        <header id='main-header' className={styles.mainHeader}>
            <img src="/assets/icons/headerLeft.svg" alt="menu" className={styles.menuIcon} />
            <img src="/assets/icons/bell.svg" alt="notification" />
        </header>
    )
}

export default MainHeader