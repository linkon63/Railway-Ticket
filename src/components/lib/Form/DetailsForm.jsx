import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from '../../../App';
import '../Form/Styles/FormStyle.css'
var CryptoJS = require("crypto-js");

const DetailsForm = ({ formStep, nextFormStep }) => {

    const [data, setData] = useContext(FormContext)
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });

    const onSubmit = (values) => {
        try {
            // console.log("Value:", values)
            const name = values.name
            let gender = (values.gender == null ? "no" : values.gender)
            const eName = CryptoJS.AES.encrypt(name, 'my-secret-key@123').toString()
            const eGender = CryptoJS.AES.encrypt(gender, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kName = (key[0])
            const kGender = (key[1])
            setData({ ...data, values })
            localStorage.setItem(`${kName}`, `${eName}`)
            localStorage.setItem(`${kGender}`, `${eGender}`)
            nextFormStep()
        } catch (error) {
            console.log("Step 1 Form Error", error)
        }
    };

    return (
        <div className={formStep === 0 ? "showForm" : "hideForm"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-5 p-5'>
                    <label htmlFor="name">*Name</label>
                    <br />
                    <input
                        className='w-100'
                        type="text"
                        id="name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    {errors.name && (
                        <p>
                            Name is required**
                        </p>
                    )}
                    <br />
                    <br />
                    <span>Gender:</span> <br />
                    <div className='ms-5'>
                        <label htmlFor="field-gender">
                            <input
                                {...register("gender")}
                                type="radio"
                                value="male"
                                id="field-gender"
                            />
                            Male
                        </label>
                    </div>
                    <div className='ms-5'>
                        <label htmlFor="field-gender">
                            <input
                                {...register("gender")}
                                type="radio"
                                value="female"
                                id="field-gender"
                            />
                            Female
                        </label>
                    </div>

                    <div className='text-end'>
                        {errors.name && (
                            <p className='text-danger'>
                                Name is required
                            </p>
                        )}
                        <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DetailsForm;