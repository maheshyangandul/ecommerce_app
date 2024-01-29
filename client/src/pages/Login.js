import React from 'react'
import { useState } from 'react';
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../styles/AuthStyles.css"
import { useAuth } from '../context/auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
                // console.log(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={'Login - Ecommerce App'}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">

                        <button type="submit" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>
                            Forgot Password
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Login