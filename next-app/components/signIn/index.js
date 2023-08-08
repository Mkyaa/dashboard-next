"use client"
import React, { useEffect } from 'react'

//styles
import styles from './index.module.css'

//next components
import Link from 'next/link'
import { useRouter } from 'next/navigation'

//lib auth
import { setAuthCookies } from '@/lib/auth'

//redux
import { useDispatch} from 'react-redux'
import { setUser } from '@/redux/app/auth/authSlice'

//formik and yup
import { Formik } from 'formik'
import * as Yup from 'yup'

//react hot toast
import { toast } from 'react-hot-toast'

//nookies
import { parseCookies } from 'nookies'

//react loader spinner
import { ColorRing } from 'react-loader-spinner'

//shared components 
import Button from '@/shared/Button'


//form schema
const userSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
})

const SignIn = () => {

    //hooks
    const dispatch = useDispatch()
    const navigate = useRouter()

    //token variable from .env.local for cookies
    const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

    //cookies
    const cookies = parseCookies()
    const checkCookie = cookies.access_token === process.env.NEXT_PUBLIC_ACCESS_TOKEN ? true : false

    //form submit for login and set cookies and dispatch user 
    const handleFormSubmit = () => {
        try {
            setAuthCookies(cookies, accessToken)
            dispatch(setUser({ name: "John Doe" }))
            toast.success("Login success")
            navigate.push('/dashboard')
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    //useEffect to check cookies and redirect to dashboard
    useEffect(() => {
        if (checkCookie) {
            navigate.push('/dashboard');
        }
    }, []);

    return (
        // check cookie if true show loader else show form       
        checkCookie ? (
            <div className={styles.loaderContainer}>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
                <p> Already logged in. Redirecting to dashboard...</p>
            </div>
        ) : (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={userSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched }) => (
                    <form className={styles.signForm} onSubmit={handleSubmit}>

                        {/* FORM HEADER */}
                        <h1 className={styles.signLogo}>MANAGE COURSES</h1>
                        <h2 className={styles.signTitle}>SIGN IN</h2>
                        <span className={styles.signSubtitle}>Enter your credentials to access your account</span>
                        {/*  FORM HEADER END */}

                        {/* FORM BODY */}
                        <div className={styles.signInputContainer}>
                            <article className={styles.signErrBox}>
                                <label htmlFor='email'>Email</label>
                                {errors.email && touched.email && (<small>*{errors.email}</small>)}
                            </article>
                            <input id='email' type="email" placeholder="Enter your email" name="email" onBlur={handleBlur} onChange={handleChange} />
                        </div>
                        <div className={styles.signInputContainer}>
                            <article className={styles.signErrBox}>
                                <label htmlFor='password'>Password</label>
                                {errors.password && touched.password ? <small>*{errors.password}</small> : null}
                            </article>
                            <input id='password' type="password" placeholder="Enter your password" name="password" onBlur={handleBlur} onChange={handleChange} />
                        </div>
                        {/* FORM BODY END */}

                        {/* FORM FOOTER */}
                        <Button type='submit' text='SIGN IN' className={styles.signButton}></Button>
                        <span className={styles.signForgot}>Forgot your password?
                            <Link href="#" className={styles.signReset}> Reset Password</Link>
                        </span>
                        {/* FORM FOOTER END */}
                    </form>
                )}
            </Formik>
        )
    )
}

export default React.memo(SignIn)