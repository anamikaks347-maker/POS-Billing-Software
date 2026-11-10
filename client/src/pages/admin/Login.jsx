
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('https://pos-billing-software-din5.onrender.com/admin-login', {
                email,
                password
            })

            localStorage.setItem('adminToken', res.data.token)

            alert('Admin Login Successful')
            navigate('/')

        } catch (err) {
            alert(err.response?.data || 'Login Failed')
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">POS Admin Login</h3>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
