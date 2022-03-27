import "./EditProfile.css"
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStateValue } from "./StateProvider";
import Product from "./Product";
function EditProfile() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    return (
        <div className="home__container">

            <img
                className="background__image"
                src="https://github.com/yikevding/emazon/blob/main/emory.jpeg?raw=true"
                alt=""
            />
            <hr className="mt-0 mb-4" />

            <div className="row">
                <div className="col-xl-4" >

                    <div className="card mb-4 mb-xl-0">
                        <div className="card-header">Add New Product</div>
                        <div className="col-md-11 mx-auto">

                            <div className="card-body">
                                    {/* temp image */}
                                <img className='product__img' src="https://github.com/yikevding/emazon/blob/main/image/dinning%20table.jpeg?raw=true" alt="" />
                                <div class="col text-center">
                                    <button align="center" className="btn btn-secondary" type="button">Add Image</button>
                                </div>


                                <form>


                                    <div className="row gx-3 mb-2" >
                                        <label className="small mb-1">Product Name</label>
                                        <input className="form-control" id="title" type="text" />
                                    </div>
                                    <div className="row gx-3 mb-2" >
                                        <label className="small mb-1">List Price</label>
                                        <input className="form-control" id="price" type="text" />
                                    </div>
                                    <div className="row gx-3 mb-2" >
                                        <label className="small mb-1">Product Description</label>
                                        <input className="form-control" id="description" type="text" />
                                    </div>
                                    <div className="row gx-3 mb-2" >
                                        <label className="small mb-1">Product Specifications</label>
                                        <div className="row gx-3 mb-2">

                                            <div className="col-md max-auto">
                                                <label className="small mb-1">Width:</label>
                                                <input className="form-control" id="width" type="text" />
                                            </div>
                                            <div className="col-md max-auto">
                                                <label className="small mb-1">Height:</label>
                                                <input className="form-control" id="height" type="text" />
                                            </div>
                                            <div className="col-md max-auto">
                                                <label className="small mb-1">Depth:</label>
                                                <input className="form-control" id="depth" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gx-2 " >

                                        <button type='submit' className="btn btn-primary" type="button">Upload Product</button>


                                    </div>


                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-8">

                    <div className="card mb-4">
                        <div className="card-header">Edit Your Profile</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3">
                                    <label className="small mb-1">Edit Email</label>
                                    <input className="form-control" type='email' name="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" >Change Password</label>

                                        <input className="form-control" type='password' value={password} name="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={e => setPassword(e.target.value)} />
                                        <div className="invalid-feedback">{errors.password?.message}</div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLastName">Confirm New Password</label>

                                        <input className="form-control" type='password'
                                            value={confirmPassword}
                                            name="confirmPassword" {...register('confirmPassword')}
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            onChange={e => setConfirmPassword(e.target.value)} />
                                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                                    </div>
                                </div>

                                <div className="row gx-3 mb-3">

                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputOrgName">Change First Name</label>

                                        <input className="form-control" type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Change Last Name</label>
                                        <input className="form-control" type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="small mb-1" for="inputEmailAddress">Add Description (ex. I am a second-year student at Emory)</label>
                                    <input className="form-control" type='text' value={addDescription} onChange={e => setAddDescription(e.target.value)} />

                                </div>

                                <button type='submit' className="btn btn-primary" type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Previously Uploaded Products</div>
                        <div className="card-body">
                            <div className="item__row">

                                {/* costumize for user later */}
                                <label className="small mb-1">You have not uploaded any products.</label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default EditProfile;