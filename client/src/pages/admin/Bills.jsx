
import { useEffect, useState } from 'react'
import axios from 'axios'

function Bills() {

    const [bills, setBills] = useState([])

    const getBills = async () => {
        try {
            const res = await axios.get('https://pos-billing-software-din5.onrender.com/list-bill')
            setBills(res.data)
        } catch (err) {
            alert('Error Loading Bills')
        }
    }

    useEffect(() => {
        getBills()
    }, [])

    return (
        <div>

            <h2>Billing Transactions</h2>
            <p className="text-muted">View all generated bills</p>

            <div className="card shadow-sm p-4 mt-4">

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>Bill ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total Amount</th>
                                <th>Payment</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {bills.length > 0 ? (

                                bills.map(item => (

                                    <tr key={item._id}>

                                        <td>{item._id.slice(-6)}</td>

                                        <td>{item.customerName}</td>

                                        <td>{item.items.length}</td>

                                        <td>₹ {item.totalAmount}</td>

                                        <td>{item.paymentMethod}</td>

                                        <td>
                                            {new Date(item.billDate).toLocaleDateString()}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No Bills Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                <button
                    className="btn btn-primary mt-3"
                    onClick={getBills}
                >
                    Refresh Bills
                </button>

            </div>

        </div>
    )
}

export default Bills
