import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function AdminLayout() {
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">

                {/* Sidebar */}
                <div className="col-12 col-md-2 p-0">
                    <Sidebar />
                </div>

                {/* Page Content */}
                <div className="col-12 col-md-10 p-4">
                    <Outlet />
                </div>

            </div>

            <style>
                {`
                    @media (max-width: 767px) {
                        .container-fluid {
                            padding: 0;
                        }
                    }
                `}
            </style>
        </div>
    )
}

export default AdminLayout