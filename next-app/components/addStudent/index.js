import React from 'react'

//react-icons
import { IoCloseCircleOutline } from 'react-icons/io5'

//formik and yup
import { Formik } from 'formik'
import * as Yup from 'yup'

//styles
import styles from './index.module.css'

//utils
import formPattern from '@/utils/formPattern'

//shared
import Button from '@/shared/Button'


const AddStudent = ({ isOpen, onClick, addStudent, studentLength }) => {

  //form pattern
  const { URLMatch, phoneMatch } = formPattern

  //initial values
  const initialValues = {
    id: studentLength + 1,
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    domain: '',
    company: {
      name: ''
    }
  }

  //form schema
  const formSchema = Yup.object().shape({
    image: Yup.string()
      .required('Image is required'),
    name: Yup.string()
      .required('First name is required'),
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Email is invalid').
      required('Email is required'),
    phone: Yup.string()
      .matches(phoneMatch, 'Phone number is not valid')
      .required('Phone is required'),
    domain: Yup.string()
      .matches(URLMatch, 'Website is not valid')
      .required('Website is required'),
    name: Yup.string()
      .required('Company name is required')
  })

  return (
    <div className={
      isOpen ? `${styles.modal} ${styles.modal_open}` : `${styles.modal} ${styles.modal_close}`
    }>
      <div className={styles.modal_content}>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false)
            addStudent(values)
            actions.resetForm()
            onClick()
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form className={styles.form}>
              {/* FORM HEADER */}
              <div className={styles.form_header}>
                <h1>ADD NEW STUDENT</h1>
                <IoCloseCircleOutline onClick={onClick} />
              </div>
              {/* FORM BODY */}
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="image">Image</label>
                  {errors.image && touched.image ? (
                    <small className={styles.error}>*{errors.image}</small>
                  ) : null}
                </div>
                <input type="url" name="image" id="image" placeholder='Enter your image URL' onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="firstName">First Name</label>
                  {errors.firstName && touched.firstName ? (
                    <small className={styles.error}>*{errors.firstName}</small>
                  ) : null}
                </div>
                <input type="text" name="firstName" id="firstName" placeholder='Enter your first name' onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="lastName">Last Name</label>
                  {errors.lastName && touched.lastName ? (
                    <small className={styles.error}>*{errors.lastName}</small>
                  ) : null}
                </div>
                <input type="text" name="lastName" id="lastName" placeholder='Enter your last name' onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="email">Email</label>
                  {errors.email && touched.email ? (
                    <small className={styles.error}>*{errors.email}</small>
                  ) : null}
                </div>
                <input type="email" name="email" id="email" placeholder='Enter your email' onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="phone">Phone</label>
                  {errors.phone && touched.phone ? (
                    <small className={styles.error}>*{errors.phone}</small>
                  ) : null}
                </div>
                <input type="tel" name="phone" id="phone" placeholder='Enter your phone' onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="domain">Website</label>
                  {errors.domain && touched.domain ? (
                    <small className={styles.error}>*{errors.domain}</small>
                  ) : null}
                </div>
                <input type="url" name="domain" id="domain" placeholder='Enter your website' onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className={styles.form_group}>
                <div className={styles.form_group_header}>
                  <label htmlFor="name">Company Name</label>
                  {errors.name && touched.name ? (
                    <small className={styles.error}>*{errors.name}</small>
                  ) : null}
                </div>
                <input type="text" name="name" id="name" placeholder='Enter your company name' onChange={handleChange} onBlur={handleBlur} />
              </div>

              {/* FORM BUTTON GROUP */}
              <div className={styles.form_group}>
                <Button type="submit" text='Submit' onClick={handleSubmit} className={styles.addBtn} />
                <Button type="button" text='Cancel' onClick={onClick} className={styles.closeBtn} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddStudent