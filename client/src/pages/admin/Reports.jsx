
import { useEffect, useState } from 'react'
import axios from 'axios'

function Reports() {

    const [report, setReport] = useState({
        totalBills: 0,
        totalSales: 0,
        totalReturns: 0,
        totalRefund: 0,
        totalProducts: 0,
        totalStaff: 0
    })

    const getReports = async () => {
        try {
            const res = await axios.get('https://pos-billing-software-din5.onrender.com/reports')
            setReport(res.data)
        } catch (err) {
            alert('Error Loading Reports')
        }
    }

    useEffect(() => {
        getReports()
    }, [])

    const netSales = report.totalSales - report.totalRefund

    return (
        <div>
            <h2>Reports Dashboard</h2>
            <p className="text-muted">Business Summary</p>

            <div className="row mt-4">

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3 border-primary">
                        <h6>Total Sales</h6>
                        <h3>₹ {report.totalSales}</h3>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3 border-success">
                        <h6>Net Sales</h6>
                        <h3>₹ {netSales}</h3>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3 border-danger">
                        <h6>Total Refund</h6>
                        <h3>₹ {report.totalRefund}</h3>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Bills</h6>
                        <h3>{report.totalBills}</h3>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Returns</h6>
                        <h3>{report.totalReturns}</h3>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Products</h6>
                        <h3>{report.totalProducts}</h3>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3">
                        <h6>Total Staff</h6>
                        <h3>{report.totalStaff}</h3>
                    </div>
                </div>

            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={getReports}
            >
                Refresh Reports
            </button>
        </div>
    )
}

export default Reports
