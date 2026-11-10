import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {

    const [report, setReport] = useState({
        totalSales: 0,
        totalBills: 0,
        totalProducts: 0,
        totalStaff: 0,
        totalReturns: 0,
        totalRefund: 0
    })

    const getDashboardData = async () => {
        try {
            const res = await axios.get('https://pos-billing-software-din5.onrender.com/reports')
            setReport(res.data)
        }
        catch (err) {
            alert('Dashboard Data Loading Failed')
        }
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return (
        <div>

            <h2>Admin Dashboard</h2>
            <p className="text-muted">
                Welcome to POS Admin Panel
            </p>

            <div className="row mt-4">

                <div className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Sales</h6>
                        <h3>₹ {report.totalSales}</h3>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Bills</h6>
                        <h3>{report.totalBills}</h3>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Products</h6>
                        <h3>{report.totalProducts}</h3>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Staff</h6>
                        <h3>{report.totalStaff}</h3>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Returns</h6>
                        <h3>{report.totalReturns}</h3>
                    </div>
                </div>

                <div className="col-md-4 col-sm-6 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Refund</h6>
                        <h3>₹ {report.totalRefund}</h3>
                    </div>
                </div>

            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={getDashboardData}
            >
                Refresh Dashboard
            </button>

        </div>
    )
}

export default Dashboard