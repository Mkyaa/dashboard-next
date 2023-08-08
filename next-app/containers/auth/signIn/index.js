import React from 'react'

//styles
import styles from './index.module.css'

//components
import SignIn from '@/components/signIn'

const SignInContainer = () => {
    return (
        <div className={styles.signContainer} >
            <SignIn />
        </div>
    )
}

export default SignInContainer