"use client"
import React, { useEffect, useState } from 'react'

//styles
import styles from './index.module.css'

//components
import Pagination from '@/components/pagination'
import AddStudent from '@/components/addStudent'
import StudentList from '@/components/studentList'

//redux 
import { useDispatch, useSelector } from 'react-redux'
import { addStudentAsync, deleteStudentAsync, getStudents, updateStudentAsync } from '@/utils/api'
import { addStudent, removeStudent, setStudents, updateStudent } from '@/redux/app/student/studentSlice'

//react loader spinner
import { ColorRing } from 'react-loader-spinner'

//react hot toast
import { toast } from 'react-hot-toast'

//next components
import { useRouter, useSearchParams } from 'next/navigation'

//shared components
import Button from '@/shared/Button'

const StudentContainer = () => {

    //redux hooks
    const { students } = useSelector(state => state.student)

    //hooks
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    
    //search params from url query string
    const searchQuery = searchParams.get('search')
    const sizeQuery = searchParams.get('size')
    const pageQuery = searchParams.get('page')

    //states
    const [size, setSize] = useState(sizeQuery || 6)
    const [page, setPage] = useState(pageQuery || 1)
    const [search, setSearch] = useState(searchQuery || '')
    const [showStudents, setShowStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [length, setLength] = useState(0)

    //pagination variables 
    const end = length > page * size ? page * size : length
    const start = (page - 1) * size
    const totalPage = Math.ceil(length / size)

    //fetch students from api and dispatch to redux store
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const data = await getStudents();
            dispatch(setStudents(data));
            setShowStudents(data.slice(start, end));
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    //fetch students on page load
    useEffect(() => {
        fetchStudents()
        setLoading(false)
    }, [dispatch, page, size])


    //show add student modal
    const showAddStudents = () => {
        setIsOpen(!isOpen)
    }

    //add student function
    const addStudentFunc = async (student) => {
        try {
            const newStudent = await addStudentAsync(student)
            dispatch(addStudent(student))
            toast.success('Student added successfully')
        } catch (error) {
            toast.error(error)
        }
    }

    //search students function
    const handleSearch = (e) => {
        setSearch(e.target.value)
        router.push(`?page=${page}&size=${size}&search=${e.target.value}`)
    }

   //delete student function
    const deleteStudentFunc = async (id) => {
        try {
            const newStudent = await deleteStudentAsync(id)
            dispatch(removeStudent(id))
            toast.success('Student deleted successfully')
        } catch (error) {
            toast.error(error)
        }
    }

    //update student function
    const updateStudentFunc = async (student) => {
        try {
            const newStudent = await updateStudentAsync(student)
            dispatch(updateStudent(student))
            toast.success('Student updated successfully')
        } catch (error) {
            toast.error(error)
        }
    }

    //search students on search input change and set pagination variables 
    useEffect(() => {
        const results = students.filter(student => {
            return student.firstName.toLowerCase().includes(search.toLowerCase())
                || student.lastName.toLowerCase().includes(search.toLowerCase())
                || student.email.toLowerCase().includes(search.toLowerCase())
                || student.phone.toLowerCase().includes(search.toLowerCase())
                || student.domain.toLowerCase().includes(search.toLowerCase())
                || student.company.name.toLowerCase().includes(search.toLowerCase())
        })
        setShowStudents(results.slice(start, end))
        setLength(results.length)
    }, [search, students, start, end])


    return (
        <section id='student-container' className={styles.studentContainer}>
            {
                isOpen && <AddStudent onClick={showAddStudents} isOpen={isOpen} addStudent={addStudentFunc} studentLength={students.length} />
            }

            {/*  HEADER  */}
            <div className={styles.studentContainer_header}>
                <h1>Students List</h1>
                <div className={styles.rightBox}>
                    <div className={styles.searchBox}>
                        <input type="text" placeholder="Search..." onChange={handleSearch} />
                        <img src="/assets/icons/search.svg" alt="search" />
                    </div>
                    <Button type='button' text='ADD NEW STUDENT' className={styles.addBtn} onClick={showAddStudents}/> 
                </div>
            </div>
            {/* HEADER END */}

            {/* TABLE */}
            <table className={styles.studentContainer_table}>
                {/* TABLE HEADER AND BODY WITH OVERFLOW */}
                <div className={styles.table_overflow_container}>
                    <thead className={styles.studentContainer_table_header}>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody className={styles.studentContainer_table_body}>
                        {
                            loading
                                ? (
                                    <tr className={styles.loadingRow}>
                                        <td colSpan="5">
                                            <ColorRing
                                                visible={true}
                                                height="60"
                                                width="60"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                            />
                                        </td>
                                    </tr>

                                )
                                : showStudents?.map(student =>
                                    <StudentList
                                        key={student.id}
                                        student={student}
                                        deleteStudent={deleteStudentFunc}
                                        updateStudent={updateStudentFunc}
                                    />)
                        }
                    </tbody>
                </div>
                {/* TABLE HEADER AND BODY END */}

                {/* TABLE FOOTER */}
                <tfoot className={styles.studentContainer_table_footer}>
                    <tr>
                        <td colSpan="5">
                            <Pagination
                                page={page}
                                setPage={setPage}
                                size={size}
                                setSize={setSize}
                                totalPage={totalPage}
                                dataLength={length}
                                start={start}
                                end={end}
                                search={search}
                            />
                        </td>
                    </tr>
                </tfoot>
                {/* TABLE FOOTER END */}
            </table>
        </section>
    )
}

export default StudentContainer