import React from 'react'
import { useState } from 'react';
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../styles/AuthStyles.css"

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    // validation
    const validateForm = () => {
        const errors = {};
        if (!name) {
            errors.name = "Name is required.";
        } else {
            const stringPattern = /^[A-Za-z ]+$/;
            if (!stringPattern.test(name)) {
                errors.name = "Name must contain only alphabetic characters.";
            } else if (name.length < 3) {
                errors.name = "Name must be at least 3 characters.";
            }
        }

        if (!answer) {
            errors.answer = "Required.";
        }

        if (!address) {
            errors.address = "Address is required.";
        }

        if (!phone) {
            errors.phone = "Phone no is required.";
        } else {
            const stringPattern = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
            if (!stringPattern.test(phone)) {
                errors.phone = "Enter Number Only.";
            } else if (phone.length !== 10) {
                errors.phone = "Please enter valid  Mobile Number.";
            }
        }

        if (!password) {
            errors.password = "Password is required.";
        } else if (password.length < 6) {
            errors.password = "Password atleast 6 characters.";
        }

        if (!email) {
            errors.email = "Email is required.";
        } else {
            const stringPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!stringPattern.test(email)) {
                errors.email = "Please enter a valid email address.";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await axios.post("/api/auth/register", {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    answer,
                });
                if (res && res.data.success) {
                    toast.success(res.data.message);
                    navigate("/login");
                    // console.log(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <Layout title={'Register - Ecommerce App'}>
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter Your Name"
                            // required
                            autoFocus
                        />
                        {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email "
                        // required
                        />
                        {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your Password"
                        // required
                        />
                        {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            name='phone'
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Your Phone"
                        // required
                        />
                        {formErrors.phone && <p style={{ color: "red" }}>{formErrors.phone}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            name='address'
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Enter Your Address"
                        // required
                        />
                        {formErrors.address && <p style={{ color: "red" }}>{formErrors.address}</p>}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            name='answer'
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="What is your city name?"
                        // required
                        />
                        {formErrors.answer && <p style={{ color: "red" }}>{formErrors.answer}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary text-center">
                        REGISTER
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Register