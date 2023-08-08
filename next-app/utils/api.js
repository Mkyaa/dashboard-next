// getStudents() function will fetch the data from the API and return the data.
export const getStudents = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL)
    const data = await response.json()
    return data.users
}

// addStudentAsync() function will add the student to the API and return the data.
export const addStudentAsync = async (student) => {
    const response = await fetch(process.env.NEXT_PUBLIC_ADD_USER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    const data = await response.json()
    return data
}

// updateStudentAsync() function will update the student to the API and return the data.
export const updateStudentAsync = async (student) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${student.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    const data = await response.json()
    return data
}

// deleteStudentAsync() function will delete the student to the API and return the data.
export const deleteStudentAsync = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data
}