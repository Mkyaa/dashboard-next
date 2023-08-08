import React, { useState } from 'react'

//styles
import styles from './index.module.css'

//react icons
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

const StudentList = ({ student, deleteStudent, updateStudent }) => {

    //destructure student props for initial values of input fields in edit mode
    const { id, image, firstName: initialFirstName, lastName: initialLastName, email: initialEmail, phone: initialPhone, domain: initialDomain, company: { name: initialCompanyName } } = student

    //states
    const [edit, setEdit] = useState(false)
    const [firstName, setFirstName] = useState(initialFirstName)
    const [lastName, setLastName] = useState(initialLastName)
    const [email, setEmail] = useState(initialEmail)
    const [phone, setPhone] = useState(initialPhone)
    const [domain, setDomain] = useState(initialDomain)
    const [companyName, setCompanyName] = useState(initialCompanyName)

    //edit student
    const handleEdit = () => {
        const student = {
            id,
            image,
            firstName,
            lastName,
            email,
            phone,
            domain,
            company: {
                name: companyName
            }
        }
        updateStudent(student)
        setEdit(false)
    }

    //cancel edit student and set initial values
    const handleCancel = () => {
        setFirstName(initialFirstName)
        setLastName(initialLastName)
        setEmail(initialEmail)
        setPhone(initialPhone)
        setDomain(initialDomain)
        setCompanyName(initialCompanyName)
        setEdit(false)
    }

    return (
        <tr className={styles.studentBox}>
            <td>
                <div className={styles.studentBox_img}>
                    <img alt="student" src={image} />
                    <div className={styles.gradientOverlay}></div>
                </div>
            </td>
            {
                !edit
                    ? <td>{firstName} {lastName}</td>
                    :
                    (
                        <td className={styles.nameBox}>
                            <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </td>
                    )
            }
            {
                !edit
                    ? <td>{email}</td>
                    : <td className={styles.emailBox}><input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
            }
            {
                !edit
                    ? <td>{phone}</td>
                    : <td className={styles.phoneBox}><input type="text" name="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /></td>
            }
            {
                !edit
                    ? <td>{domain}</td>
                    : <td className={styles.domainBox}><input type="text" placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} /></td>
            }
            {
                !edit
                    ? <td>{companyName}</td>
                    : <td className={styles.companyBox}><input type="text" name="company"  placeholder="Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /></td>
            }
            <td>
                {
                    !edit ? (
                        <div className={styles.studentBox_action}>
                            <img src="/assets/icons/edit.svg" alt="edit" onClick={() => setEdit(true)} />
                            <img src="/assets/icons/trash.svg" alt="delete" onClick={() => deleteStudent(id)} />
                        </div>
                    )
                        :
                        (
                            <div className={styles.studentBox_actionEdit}>
                                <AiOutlineCheck onClick={handleEdit} className={styles.checkEdit} />
                                <AiOutlineClose onClick={handleCancel} className={styles.cancelEdit} />
                            </div>
                        )
                }
            </td>
        </tr>
    )
}

export default StudentList
