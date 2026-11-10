import { Link,useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate()

const handleLogout = () => {
    localStorage.removeItem('adminToken')

    alert('Logged Out Successfully')

    window.location.replace('/login')
}
    return (
        <div className="sidebar">

            <style>
                {`
                    .sidebar {
                        background-color: #212529;
                        color: white;
                        min-height: 100vh;
                        padding: 25px 15px;
                    }

                    .sidebar h4 {
                        text-align: center;
                        margin-bottom: 35px;
                        font-weight: bold;
                    }

                    .sidebar-link {
                        display: block;
                        color: #adb5bd;
                        text-decoration: none;
                        padding: 12px 15px;
                        margin-bottom: 8px;
                        border-radius: 8px;
                        transition: 0.3s;
                    }

                    .sidebar-link:hover {
                        background-color: #0d6efd;
                        color: white;
                        padding-left: 22px;
                    }

                    @media (max-width: 767px) {
                        .sidebar {
                            min-height: auto;
                            width: 100%;
                            padding: 15px;
                        }

                        .sidebar h4 {
                            text-align: left;
                            margin-bottom: 15px;
                        }

                        .sidebar-menu {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                        }

                        .sidebar-menu li {
                            width: 100%;
                        }
                    }
                `}
            </style>

            <h4>POS Billing</h4>

            <ul className="nav flex-column sidebar-menu">

                <li className="nav-item">
                    <Link className="sidebar-link" to="/">Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/products">Products</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/staff">Staff</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/suppliers">Suppliers</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/billing">Billing</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/bills">Bills</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/returns">Returns</Link>
                </li>

                <li className="nav-item">
                    <Link className="sidebar-link" to="/reports">Reports</Link>
                </li>

            </ul>
                <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleLogout}>
                Logout
            </button>

        </div>
    )
}

export default Sidebar