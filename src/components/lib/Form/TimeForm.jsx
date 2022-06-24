import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
var CryptoJS = require("crypto-js");
const TimeForm = () => {
    const navigate = useNavigate()
    const { handleSubmit, setValue, reset, formState: { errors }, register, } = useForm({});
    const [timeValue, setTimeValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [showForm, setShowForm] = useState('hideForm')
    useEffect(() => {
        setTimeout(() => { setShowForm('showForm') }, 700)
        console.log("Step-3")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData

        const d = new Date() // today, now
        if (Enc) {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            const { date, time } = decryptedData
            const dateTime = { date: date, time: time }
            if (date || time) {
                setTimeValue(time)
                setDateValue(date)
                reset(dateTime)
            } else {
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false })
                const dateTime = { date: d.toLocaleDateString('en-CA'), time: time }
                setDateValue(`${d.toLocaleDateString('en-CA')}`)
                setTimeValue(time)
                reset(dateTime)
            }
        }
    }, [])

    const onSubmit = (values) => {
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {

            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            const timeData = [{ ...decryptedData, date: dateValue, time: timeValue }]
            var time = CryptoJS.AES.encrypt(JSON.stringify(timeData), 'secret key 123').toString();
            localStorage.setItem("Enc", `${time}`)
        }
        next()
    }

    const next = () => {
        console.log("Next page")
        navigate("/step4")
    }
    const previous = () => {
        console.log("previous page")
        navigate("/step2")
    }


    return (
        <div className='p-5'>

            {
                showForm == 'hideForm' &&
                <div className="d-flex justify-content-center">
                    <div className="loader"></div>
                </div>
            }

            <div className={`${showForm}`}>
                <p>Step 3 : Time</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="date">Date</label> <br />
                    <input
                        type="date"
                        id="date"
                        placeholder="dd-mm-yyyy"
                        className='w-100'
                        {...register("date", {
                            required: true,
                        })}
                        onChange={(e) => {
                            console.log("time Change")
                            setDateValue(e.target.value)
                        }}
                    />
                    <br /> <br />
                    <label htmlFor="time">Time</label> <br />
                    <input
                        className='w-100'
                        type="time"
                        id="time"
                        name="time"
                        {...register("time", {
                            required: true,
                        })}
                        onChange={(e) => {
                            setTimeValue(e.target.value)
                            console.log("time Change")
                        }}
                    />
                    <br />  <br />
                    <div className="d-flex justify-content-between">
                        <button className='btn btn-secondary btn-sm text-center' onClick={previous}>Previous</button>
                        <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TimeForm;
