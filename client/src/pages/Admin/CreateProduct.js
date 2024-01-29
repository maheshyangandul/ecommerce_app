import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';

const { Option } = Select;


const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    // validation
    const validateForm = () => {
        const errors = {};

        if (!photo) {
            errors.photo = "Photo is Required";
        }
        if (!name) {
            errors.name = "Product name is Required";
        }
        if (!description) {
            errors.description = "Description is Required";
        }
        if (!price) {
            errors.price = "Price is Required";
        }
        if (!quantity) {
            errors.quantity = "Quantity is Required";
        }

        // if (!address) {
        //     errors.address = "Address is required.";
        // }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/category/get-category');
            // console.log(data.category);
            if (data?.success) {
                setCategories(data?.category);
            }

        } catch (error) {
            console.log(error);
            toast.error('Error in getting category')
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    // create product function
    const handleCreate = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const productData = new FormData();
                productData.append("name", name);
                productData.append("description", description);
                productData.append("price", price);
                productData.append("quantity", quantity);
                productData.append("photo", photo);
                productData.append("category", category);
                const { data } = axios.post(
                    "/api/product/create-product",
                    productData
                );
                if (data?.success) {
                    toast.error(data?.message);
                } else {
                    toast.success("Product Created Successfully");
                    navigate("/dashboard/admin/products");
                }
            } catch (error) {
                console.log(error);
                toast.error("something went wrong");
            }
        }
    }

    return (
        <Layout title={"Create Product - Dashboard"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select variant={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}

                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type="file" name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                                {formErrors.photo && <p style={{ color: "red" }}>{formErrors.photo}</p>}
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"150px"} className='img img-responsive border border-primary rounded' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='Write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                                {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {formErrors.description && <p style={{ color: "red" }}>{formErrors.description}</p>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                {formErrors.price && <p style={{ color: "red" }}>{formErrors.price}</p>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                {formErrors.quantity && <p style={{ color: "red" }}>{formErrors.quantity}</p>}
                            </div>
                            <div className="mb-3">
                                <Select
                                    variant={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct