
import { useEffect, useState } from 'react'
import axios from 'axios'

function Staff() {

    const [staff, setStaff] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const getStaff = async () => {
        try {
            const res = await axios.get('https://pos-billing-software-din5.onrender.com/list-staff')
            setStaff(res.data)
        } catch (err) {
            alert('Error Loading Staff')
        }
    }

    useEffect(() => {
        getStaff()
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()

        try {
            await axios.post('https://pos-billing-software-din5.onrender.com/add-staff', {
                name,
                email,
                password,
                phone
            })

            alert('Staff Added Successfully')

            setName('')
            setEmail('')
            setPassword('')
            setPhone('')

            getStaff()

        } catch (err) {
            alert(err.response?.data || 'Error Adding Staff')
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://pos-billing-software-din5.onrender.com/delete-staff/${id}`)
            alert('Staff Deleted')
            getStaff()
        } catch (err) {
            alert('Delete Failed')
        }
    }

    return (
        <div>

            <h2>Staff Management</h2>

            <div className="card shadow-sm p-4 mt-4">

                <h5>Add Staff</h5>

                <form onSubmit={handleAdd}>

                    <input
                        className="form-control mb-3"
                        placeholder="Staff Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary">
                        Add Staff
                    </button>

                </form>

            </div>

            <div className="card shadow-sm p-4 mt-4">

                <h4>Staff List</h4>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped mt-3">

                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {staff.map(item => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Staff
