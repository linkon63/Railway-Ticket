import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

var CryptoJS = require("crypto-js");

const Location = () => {
    const navigate = useNavigate()


    const { handleSubmit, reset, setValue, formState: { errors }, register, } = useForm({});
    const [fLocation, setFLocation] = useState('')
    const [tLocation, setTLocation] = useState('')
    const [showForm, setShowForm] = useState('hideForm')
    useEffect(() => {
        setTimeout(() => { setShowForm('showForm') }, 700)
        console.log("Step-2")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            const { fromLocation, toLocation } = decryptedData
            setFLocation(fromLocation ? fromLocation : "")
            setTLocation(toLocation ? toLocation : "")

        }

    }, [])

    const onSubmit = (values) => {
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];

            const locationData = [{ ...decryptedData, toLocation: tLocation ? tLocation : values.toLocation, fromLocation: fLocation ? fLocation : values.fromLocation }]
            var location = CryptoJS.AES.encrypt(JSON.stringify(locationData), 'secret key 123').toString();
            localStorage.setItem("Enc", `${location}`)
            next()
        } else {
            var locationData = CryptoJS.AES.encrypt(JSON.stringify([values]), 'secret key 123').toString();
            localStorage.setItem("Enc", `${locationData}`)
            next()
        }
    }

    const next = () => {
        console.log("Next page")
        navigate("/step3")
    }
    const previous = () => {
        console.log("previous page")
        navigate("/step1")
    }
    return (
        <div className={`p-5`} >

            {
                showForm == 'hideForm' &&
                <div className="d-flex justify-content-center">
                    <div className="loader"></div>
                </div>
            }

            <div className={`${showForm}`}>
                <p>Step 2 : Location</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>Form </span>
                    <br />
                    <select  {...register("fromLocation", { required: true })} className="w-100"
                        onChange={(e) => {
                            console.log("fromLocation:", e.target.value)
                            setFLocation(e.target.value)
                        }}
                    >
                        <option selected={fLocation == "東京" ? true : false} value="東京">東京</option>
                        <option selected={fLocation == "横浜" ? true : false} value="横浜">横浜</option>
                    </select>
                    <br />
                    <br />
                    <span className='me-1'>To </span>
                    <br />
                    <select {...register("toLocation", { required: true })} className="w-100"
                        onChange={(e) => {
                            console.log("fromLocation:", e.target.value)
                            setTLocation(e.target.value)
                        }}
                    >
                        <option selected={tLocation == "名古屋" ? true : false} value="名古屋">名古屋</option>
                        <option selected={tLocation == "大阪" ? true : false} value="大阪">大阪</option>
                    </select>
                    <br /><br />
                    <div className="d-flex justify-content-between">
                        <button className='btn btn-secondary btn-sm text-center' onClick={previous}>Previous</button>
                        <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Location;
