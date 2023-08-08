"use client"

import React, { useEffect, useState } from 'react'

//next components
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = ({ link }) => {

    // destructure link
    const { title, path, icons } = link

    //state
    const [active, setActive] = useState(false)

    //hooks
    const location = usePathname()

    //useEffect to set active state
    useEffect(() => {
        if (location === path) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [location, path])

    return (
        <li>
            <Link
                href={
                    path ? path : '/dashboard'
                }
                className={active ? 'bg-orange-dark' : ''}
            >
                <div>
                    <img
                        src={icons}
                        alt={title}
                    />
                </div>
                <p>{title}</p>
            </Link>
        </li>
    )
}

export default Navbar