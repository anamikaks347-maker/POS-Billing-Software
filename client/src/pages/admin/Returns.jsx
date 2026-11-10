
import { useEffect, useState } from 'react'
import axios from 'axios'

function Returns() {

    const [returns, setReturns] = useState([])
    const [bills, setBills] = useState([])
    const [billId, setBillId] = useState('')
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState(1)

    const getData = async () => {
        try {
            const returnRes = await axios.get('https://pos-billing-software-din5.onrender.com/list-return')
            const billRes = await axios.get('https://pos-billing-software-din5.onrender.com/list-bill')

            setReturns(returnRes.data)
            setBills(billRes.data)
        } catch (err) {
            alert('Error Loading Data')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const selectedBill = bills.find(item => item._id === billId)

    const handleReturn = async (e) => {
        e.preventDefault()

        try {
            await axios.post('https://pos-billing-software-din5.onrender.com/add-return', {
                billId,
                productId,
                quantity: Number(quantity)
            })

            alert('Product Returned Successfully')

            setBillId('')
            setProductId('')
            setQuantity(1)

            getData()

        } catch (err) {
            alert(err.response?.data || 'Return Failed')
        }
    }

    return (
        <div>
            <h2>Returns Management</h2>
            <p className="text-muted">Manage product returns and refunds</p>

            <div className="card shadow-sm p-4 mt-4">

                <h5>Add Product Return</h5>

                <form onSubmit={handleReturn}>

                    <label className="mb-2">Select Bill</label>

                    <select
                        className="form-select mb-3"
                        value={billId}
                        onChange={e => {
                            setBillId(e.target.value)
                            setProductId('')
                        }}
                        required
                    >
                        <option value="">Select Bill</option>

                        {bills.map(item => (
                            <option key={item._id} value={item._id}>
                                {item.customerName} - ₹{item.totalAmount}
                            </option>
                        ))}
                    </select>

                    <label className="mb-2">Select Product</label>

                    <select
                        className="form-select mb-3"
                        value={productId}
                        onChange={e => setProductId(e.target.value)}
                        required
                    >
                        <option value="">Select Product</option>

                        {selectedBill?.items.map((item, index) => (
                            <option
                                key={index}
                                value={item.productId}
                            >
                                {item.name} - ₹{item.price} (Qty: {item.quantity})
                            </option>
                        ))}
                    </select>

                    <label className="mb-2">Return Quantity</label>

                    <input
                        type="number"
                        min="1"
                        className="form-control mb-3"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary">
                        Submit Return
                    </button>

                </form>
            </div>

            <div className="card shadow-sm p-4 mt-4">

                <h5>Return History</h5>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped mt-3">

                        <thead className="table-dark">
                            <tr>
                                <th>Return ID</th>
                                <th>Bill ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Refund Amount</th>
                                <th>Return Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {returns.length > 0 ? (
                                returns.map(item => (
                                    <tr key={item._id}>
                                        <td>{item._id.slice(-6)}</td>
                                        <td>{item.billId?.toString().slice(-6)}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹ {item.refundAmount}</td>
                                        <td>
                                            {new Date(item.returnDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No Returns Found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>

                <button
                    className="btn btn-primary mt-3"
                    onClick={getData}
                >
                    Refresh Returns
                </button>

            </div>
        </div>
    )
}

export default Returns
