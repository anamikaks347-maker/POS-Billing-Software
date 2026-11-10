import { useEffect, useState } from 'react'
import axios from 'axios'

function Products() {

    const [products, setProducts] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [photo, setPhoto] = useState(null)

    const getProducts = async () => {
        try {
            const res = await axios.get('https://pos-billing-software-din5.onrender.com/list-product')
            setProducts(res.data)
        }
        catch (err) {
            alert('Products Loading Failed')
        }
    }

    const addProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('stock', stock)
        formData.append('photo', photo)

        try {
            await axios.post('https://pos-billing-software-din5.onrender.com/add-product', formData)

            alert('Product Added Successfully')

            setName('')
            setPrice('')
            setCategory('')
            setStock('')
            setPhoto(null)

            getProducts()
        }
        catch (err) {
            alert(err.response?.data || 'Product Adding Failed')
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://pos-billing-software-din5.onrender.com/delete-product/${id}`)

            alert('Product Deleted Successfully')
            getProducts()
        }
        catch (err) {
            alert('Product Deleting Failed')
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>

            <h2>Product Management</h2>
            <p className="text-muted">Add and manage products</p>

            {/* Add Product Form */}

            <div className="card shadow-sm p-4 mt-4">

                <h5 className="mb-3">Add New Product</h5>

                <form onSubmit={addProduct}>

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label>Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Category</label>
                            <input
                                type="text"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Stock</label>
                            <input
                                type="number"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Product Photo</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                required
                            />
                        </div>

                    </div>

                    <button className="btn btn-primary">
                        Add Product
                    </button>

                </form>

            </div>

            {/* Product List */}

            <div className="card shadow-sm p-4 mt-4">

                <h5 className="mb-3">Product List</h5>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((item) => (

                                <tr key={item._id}>

                                    <td>
                                        <img
                                            src={`https://pos-billing-software-din5.onrender.com/uploads/${item.photo}`}
                                            width="50"
                                            height="50"
                                            alt={item.name}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </td>

                                    <td>{item.name}</td>
                                    <td>₹ {item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.stock}</td>

                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteProduct(item._id)}
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

export default Products