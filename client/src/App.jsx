
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Staff from './pages/admin/Staff'
import Supplier from './pages/admin/Supplier'
import Billing from './pages/admin/Billing'
import Returns from './pages/admin/Returns'
import Reports from './pages/admin/Reports'
import Bills from './pages/admin/Bills'

import AdminLayout from './components/AdminLayout'
import Login from './pages/admin/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login Page */}
                <Route path="/login" element={<Login />} />

                {/* Protected Admin Pages */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>

                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/staff" element={<Staff />} />
                        <Route path="/suppliers" element={<Supplier />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/bills" element={<Bills />} />
                        <Route path="/returns" element={<Returns />} />
                        <Route path="/reports" element={<Reports />} />

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
