import React, { useState } from 'react';
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export default function CreateProduct() {
    const [productNameState, setProductNameState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');
    const [priceState, setPriceState] = useState('');
    const [categoryState, setCategoryState] = useState('');
    const [stockState, setStockState] = useState('');
    const [fileState, setFileState] = useState('');
    const navigate = useNavigate();

    const productNameStateChangeHandler = (event) => {
        setProductNameState(event.target.value);
    }
    const descriptionStateChangeHandler = (event) => {
        setDescriptionState(event.target.value);
    }
    const priceStateChangeHandler = (event) => {
        setPriceState(event.target.value);
    }
    const categoryStateChangeHandler = (event) => {
        setCategoryState(event.target.value);
    }
    const stockStateChangeHandler = (event) => {
        setStockState(event.target.value);
    }
    const fileChangeHandler = (event) => {
        setFileState(event.target.files[0]);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            //create product
            console.log(fileState);

            const formData = new FormData();
            formData.append("name", productNameState);
            formData.append("description", descriptionState);
            formData.append("price", priceState);
            formData.append("category", categoryState);
            formData.append("stock", stockState);
            formData.append("file", fileState);
            const response = await axios.post("/api/v1/seller/product/new",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            // const inputData = {
            //     name: productNameState,
            //     description: descriptionState,
            //     price: priceState,
            //     category: categoryState,
            //     stock: stockState
            // }
            // let response = await fetch("/api/v1/seller/product/new", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(inputData)
            // });
            // response = await response.json();
            if (!response.data.success) {
                alert("Enter valid credentials");
            }
            console.log(response.data.product);

        } catch (error) {
            console.log(error.message);
        }


        setProductNameState('');
        setDescriptionState('');
        setPriceState('');
        setCategoryState('');
        setStockState('');
        alert("Product Successfully Listed");
        navigate("/seller-page");

    }
    return (
        <div>
            <h2 className='head'>Add Product</h2>
        <div className='signup-form'>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control" name="productName" value={productNameState} onChange={productNameStateChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" value={descriptionState} onChange={descriptionStateChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" name='price' value={priceState} onChange={priceStateChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" name='category' value={categoryState} onChange={categoryStateChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="stocks" className="form-label">Number of Stocks</label>
                    <input type="text" className="form-control" name="stocks" value={stockState} onChange={stockStateChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Upload Shop Image</label>
                    <input type="file" onChange={fileChangeHandler} name="file" />
                </div>
                <div className='SignUp-btns'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {/* <Link to="/seller-login" className="btn btn-primary already-user">Already Seller ?</Link> */}
                </div>
            </form >
        </div >
        </div>
    )
}
