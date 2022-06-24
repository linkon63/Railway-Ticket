import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../lib/Form/Styles/FormStyle.css'
var CryptoJS = require("crypto-js");
const SendingForm = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [userFormData, setUserFormData] = useState({})
    const [message, setMessage] = useState(false)
    const [emessage, seteMessage] = useState(false)

    const [showForm, setShowForm] = useState('hideForm')
    useEffect(() => {

        setTimeout(() => { setShowForm('showForm') }, 700)
        console.log("Step-6")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            let number = parseFloat(decryptedData.amount);
            number = number * (1.47)
            let commaSeparatorNumber = number.toLocaleString()
            // let commaSeparatorNumber = number.toLocaleString('en-US', { maximumFractionDigits: 2 })

            setUserFormData({ ...decryptedData, floatAmount: commaSeparatorNumber })
        }

    }, [])

    const submit = () => {
        console.log("Sending")
        setShow(true)
        const { name, gender, fromLocation, toLocation, date, time, amount, notes, floatAmount } = userFormData
        const userTickerObj = {
            name: name || "",
            gender: gender || "",
            fromLocation: fromLocation || "",
            toLocation: toLocation || "",
            date: date || "",
            time: time || "",
            amount: amount || "",
            floatAmount: floatAmount || "",
            notes: notes || "",
            id: Math.floor(Math.random() * 10000000000)
        }

        try {

            fetch('https://railwayticketsystem.herokuapp.com/send', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userTickerObj)
            })
                .then(res => res.json())
                .then(success => {
                    if (success) {
                        console.log('data created successfully.', success);
                        setUserFormData(userTickerObj)
                        localStorage.clear()
                        setMessage(true)
                        setShow(false)
                        alert("Successfully Added data to the DB")
                    }
                    if (!success) {
                        seteMessage(true)
                        localStorage.clear()
                        setShow(false)
                        alert("The name Already Exist! ")
                    }
                })
        } catch (err) {
            console.log(err);
            setShow(false)
        }

    }

    const previous = () => {
        console.log("previous page")
        navigate("/step5")
    }
    return (
        <div className='p-5'>
            <p>Step 6</p>

            {
                showForm == 'hideForm' &&
                <div className="d-flex justify-content-center">
                    <div className="loader"></div>
                </div>
            }
            <div className={`${showForm}`}>
                {
                    userFormData && !emessage && !message && !show &&
                    <div >
                        <div className={`${show}`}>
                            <p>Name : {userFormData.name}</p>
                            <p>Gender : {userFormData.gender == 'on' ? 'male' : 'female'}</p>
                            <p>From : {userFormData.fromLocation}</p>
                            <p>To : {userFormData.toLocation}</p>
                            <p>Date : {userFormData.date}</p>
                            <p>Time : {userFormData.time}</p>
                            <p>Amount: JPY ¥ {userFormData?.floatAmount}</p>
                            <p>Notes : </p>
                            <textarea className='w-100' rows={8} value={userFormData.notes} />
                        </div>

                    </div>
                }
                {
                    show &&
                    <div className="d-flex justify-content-center">
                        <div className="loader"></div>
                    </div>
                }
                {
                    userFormData && !emessage && !message && !show &&

                    <div className="d-flex justify-content-between">
                        <button className='btn btn-secondary btn-sm text-center' onClick={previous}>Previous</button>
                        <button onClick={submit} className='btn btn-secondary btn-sm text-center' type="submit">Submit</button>
                    </div>
                }

                {
                    message &&
                    <div className=''>
                        <p>Thank you !</p>
                        <p>Your Reservation ID is: {userFormData.id}</p>
                    </div>
                }
                {
                    emessage &&
                    <div className=''>
                        <p>Error !</p>
                        <p>The Name Already Exist</p>
                        <button className='btn btn-secondary btn-sm text-center' onClick={previous}>Previous</button>
                    </div>
                }
            </div>

        </div>
    );
};

export default SendingForm;