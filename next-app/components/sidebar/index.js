import React from 'react'

//styles
import styles from './index.module.css'

//next components
import Image from 'next/image'

//utils
import { links } from '@/utils/links'

//components
import Navbar from '../navbar'

const Sidebar = () => {

    //links list for sidebar
    const navList = links.map((link, index) => {
        return <Navbar key={index} link={link} />
    })

    return (
        <aside id="sidebar-container" className={styles.sidebarContainer} >
            <h1>MANAGE COURSES</h1>
            <div className={styles.sidebarCard}>
                <Image
                    src="/assets/images/avatar.svg"
                    alt="avatar"
                    width={128}
                    height={128}
                />
                <h2>John Doe</h2>
                <p>Admin</p>
            </div>
            <nav className={styles.sidebarNav}>
                <ul>
                    {navList}
                </ul>
                <div className={styles.sidebarBottomBox}>
                    <p>Logout</p>
                    <Image
                        src="/assets/icons/logout.svg"
                        alt="logout"
                        width={17}
                        height={17}
                    />
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar