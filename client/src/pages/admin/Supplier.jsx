
import { useEffect, useState } from 'react'
import axios from 'axios'

function Supplier() {

    const [suppliers, setSuppliers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const getSuppliers = async () => {
        try {
            const res = await axios.get('https://pos-billing-software-din5.onrender.com/list-supplier')
            setSuppliers(res.data)
        } catch (err) {
            alert('Error Loading Suppliers')
        }
    }

    useEffect(() => {
        getSuppliers()
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault()

        try {
            await axios.post('https://pos-billing-software-din5.onrender.com/add-supplier', {
                name,
                email,
                phone,
                address
            })

            alert('Supplier Added Successfully')

            setName('')
            setEmail('')
            setPhone('')
            setAddress('')

            getSuppliers()

        } catch (err) {
            alert(err.response?.data || 'Error Adding Supplier')
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://pos-billing-software-din5.onrender.com/delete-supplier/${id}`)
            alert('Supplier Deleted')
            getSuppliers()
        } catch (err) {
            alert('Delete Failed')
        }
    }

    return (
        <div>

            <h2>Supplier Management</h2>

            <div className="card shadow-sm p-4 mt-4">

                <h5>Add Supplier</h5>

                <form onSubmit={handleAdd}>

                    <input
                        className="form-control mb-3"
                        placeholder="Supplier Name"
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
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary">
                        Add Supplier
                    </button>

                </form>

            </div>

            <div className="card shadow-sm p-4 mt-4">

                <h4>Supplier List</h4>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped mt-3">

                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {suppliers.map(item => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
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

export default Supplier
