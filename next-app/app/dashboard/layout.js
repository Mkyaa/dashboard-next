import React from 'react'

//components
import Sidebar from '@/components/sidebar'
import MainHeader from '@/components/mainHeader'

//styles
import styles from './page.module.css'

const DashLayout = ({ children }) => {
    return (
        <div id="dashboard-container" className={styles.dashContainer}>
            <Sidebar />
            <main id='main-container' className={styles.mainContainer}>
                <MainHeader />
                {children}
            </main>
        </div>
    )
}

export default DashLayout