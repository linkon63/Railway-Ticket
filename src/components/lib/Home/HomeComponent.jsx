import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../Form/Styles/FormStyle.css'
var CryptoJS = require("crypto-js");

const HomeComponent = () => {
    const navigate = useNavigate()
    const { handleSubmit, setValue, getValues, formState: { errors }, register, } = useForm({});
    const [radioData, setRadioData] = useState('')
    const [formValue, setFormValue] = useState({ gender: "no" })
    useEffect(() => {
        console.log("Step-1")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            const { name, gender } = decryptedData
            setRadioData(gender ? gender : '')
            setFormValue({ ...decryptedData })
            setValue('name', name ? name : "", 'gender', gender)
        }

    }, [])

    const next = () => {
        console.log("Next page")
        navigate("/step2")
    }

    const onSubmit = (values) => {

        try {
            const name = values.name
            let gender = (values.gender == null ? radioData : values.gender)
            const detailsObj = [{ ...formValue, name: name, gender: gender }]
            // Encrypt
            var detail = CryptoJS.AES.encrypt(JSON.stringify(detailsObj), 'secret key 123').toString();
            localStorage.setItem("Enc", `${detail}`)
            next()

        } catch (error) {
            console.log("Step 1 Form Error", error)
        }


    }

    return (
        <div className='p-5'>
            <p>Step 1 : Details</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=''>
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
                                name="gender"
                                type="radio"
                                value="on"
                                id="field-gender"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setRadioData(e.target.value)
                                }}
                                checked={radioData == 'on' ? true : false}
                            />
                            Male
                        </label>

                    </div>
                    <div className='ms-5'>
                        <label htmlFor="field-gender">
                            <input
                                {...register("gender")}
                                name="gender"
                                type="radio"
                                value="off"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setRadioData(e.target.value)
                                }}
                                checked={radioData == 'off' ? true : false}
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
                        < button className='btn btn-secondary btn-sm text-center' type="submit" > Next</button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default HomeComponent;
