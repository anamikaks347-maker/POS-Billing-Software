
import { useEffect, useState } from 'react'
import axios from 'axios'

function Billing() {

    const [products, setProducts] = useState([])
    const [staff, setStaff] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [staffId, setStaffId] = useState('')
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState('Cash')
    const [cart, setCart] = useState([])
    const [latestBill, setLatestBill] = useState(null)

    const getData = async () => {
        try {
            const productRes = await axios.get('https://pos-billing-software-din5.onrender.com/list-product')
            const staffRes = await axios.get('https://pos-billing-software-din5.onrender.com/list-staff')

            setProducts(productRes.data)
            setStaff(staffRes.data)
        } catch (err) {
            alert('Error Loading Data')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const addToCart = () => {

        const selectedProduct = products.find(item => item._id === productId)

        if (!selectedProduct) {
            alert('Please Select Product')
            return
        }

        if (quantity <= 0) {
            alert('Invalid Quantity')
            return
        }

        const existingItem = cart.find(item => item.productId === productId)
        const alreadyAdded = existingItem ? existingItem.quantity : 0

        if (alreadyAdded + Number(quantity) > selectedProduct.stock) {
            alert('Insufficient Stock')
            return
        }

        if (existingItem) {
            setCart(cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + Number(quantity) }
                    : item
            ))
        } else {
            setCart([...cart, {
                productId: selectedProduct._id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: Number(quantity)
            }])
        }

        setProductId('')
        setQuantity(1)
    }

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    )

    const removeItem = (id) => {
        setCart(cart.filter(item => item.productId !== id))
    }

    const generateBill = async () => {

        if (!staffId || !customerName || cart.length === 0) {
            alert('Please Enter All Details')
            return
        }

        try {
            const res = await axios.post('https://pos-billing-software-din5.onrender.com/add-bill', {
                staffId,
                customerName,
                items: cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                paymentMethod
            })

            setLatestBill(res.data)
            alert('Bill Generated Successfully!')

            setCustomerName('')
            setStaffId('')
            setCart([])

            getData()

        } catch (err) {
            alert(err.response?.data?.message || err.response?.data || 'Bill Generation Failed')
        }
    }

    return (
        <div>

            <h2>Billing Management</h2>

            <div className="card shadow-sm p-4 mt-4">

                <h5>Customer Details</h5>

                <input
                    className="form-control mb-3"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                />

                <select
                    className="form-select mb-3"
                    value={staffId}
                    onChange={e => setStaffId(e.target.value)}
                >
                    <option value="">Select Staff</option>
                    {staff.map(item => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <hr />

                <h5>Select Product</h5>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <select
                            className="form-select"
                            value={productId}
                            onChange={e => setProductId(e.target.value)}
                        >
                            <option value="">Select Product</option>

                            {products.map(item => (
                                <option key={item._id} value={item._id}>
                                    {item.name} - ₹{item.price} (Stock: {item.stock})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3 mb-3">
                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <div className="col-md-3 mb-3">
                        <button
                            className="btn btn-primary w-100"
                            onClick={addToCart}
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>

            </div>

            <div className="card shadow-sm p-4 mt-4">

                <h5>Cart Details</h5>

                <div className="table-responsive">

                    <table className="table table-bordered mt-3">

                        <thead className="table-dark">
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart.map(item => (
                                <tr key={item.productId}>
                                    <td>{item.name}</td>
                                    <td>₹{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price * item.quantity}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

                <h4 className="text-end">
                    Total: ₹{totalAmount}
                </h4>

                <label className="mt-3">Payment Method</label>

                <select
                    className="form-select mb-3"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                </select>

                <button
                    className="btn btn-success"
                    onClick={generateBill}
                >
                    Generate Bill
                </button>

            </div>

            {latestBill && (
                <div className="card shadow-sm p-4 mt-4">
                    <h5>Bill Generated Successfully</h5>
                    <p>Bill ID: {latestBill._id}</p>
                    <p>Customer: {latestBill.customerName}</p>
                    <h4>Total: ₹{latestBill.totalAmount}</h4>

                    <button
                        className="btn btn-dark"
                        onClick={() => window.print()}
                    >
                        Print Bill
                    </button>
                </div>
            )}

        </div>
    )
}

export default Billing
