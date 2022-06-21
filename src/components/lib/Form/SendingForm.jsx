import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../App';
import { useForm } from "react-hook-form";
var CryptoJS = require("crypto-js");
const SendingForm = ({ formStep, nextFormStep }) => {
    const [data, setData] = useContext(FormContext)
    const [userFormData, setUserFormData] = useState({})
    const [display, setDisplay] = useState("showForm")
    const [message, setMessage] = useState(false)
    const [emessage, seteMessage] = useState(false)

    useEffect(() => {
        const items = { ...localStorage }
        console.log("local Storage data", items)

        const name = localStorage.getItem('name')
        const gender = localStorage.getItem('gender')
        const fromLocation = localStorage.getItem('fromLocation')
        const toLocation = localStorage.getItem('toLocation')
        const date = localStorage.getItem('date')
        const time = localStorage.getItem('time')
        const amount = localStorage.getItem('amount')
        const notes = localStorage.getItem('notes')


        const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
        const dName = (dNameByte.toString(CryptoJS.enc.Utf8))

        const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
        const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

        const dFromLocationByte = CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123')
        const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

        const dTOLocationByte = CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123')
        const dToLocation = (dTOLocationByte.toString(CryptoJS.enc.Utf8))

        const dDateByte = CryptoJS.AES.decrypt(date, 'my-secret-key@123')
        const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

        const dTimeByte = CryptoJS.AES.decrypt(time, 'my-secret-key@123')
        const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

        const dAmountByte = CryptoJS.AES.decrypt(amount, 'my-secret-key@123')
        const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

        const dNotesByte = CryptoJS.AES.decrypt(notes, 'my-secret-key@123')
        const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

        const userTickerObj = {
            name: dName || "",
            gender: dGender || "",
            fromLocation: dFromLocation || "",
            toLocation: dToLocation || "",
            date: dDate || "",
            time: dTime || "",
            amount: dAmount || "",
            notes: dNotes || ""
        }
        console.log("User Ticket info:", userTickerObj)
        setUserFormData(userTickerObj)
    }, [])

    const onSubmit = async () => {
        const name = localStorage.getItem('name')
        const gender = localStorage.getItem('gender')
        const fromLocation = localStorage.getItem('fromLocation')
        const toLocation = localStorage.getItem('toLocation')
        const date = localStorage.getItem('date')
        const time = localStorage.getItem('time')
        const amount = localStorage.getItem('amount')
        const notes = localStorage.getItem('notes')


        const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
        const dName = (dNameByte.toString(CryptoJS.enc.Utf8))

        const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
        const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

        const dFromLocationByte = CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123')
        const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

        const dTOLocationByte = CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123')
        const dToLocation = (dTOLocationByte.toString(CryptoJS.enc.Utf8))

        const dDateByte = CryptoJS.AES.decrypt(date, 'my-secret-key@123')
        const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

        const dTimeByte = CryptoJS.AES.decrypt(time, 'my-secret-key@123')
        const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

        const dAmountByte = CryptoJS.AES.decrypt(amount, 'my-secret-key@123')
        const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

        const dNotesByte = CryptoJS.AES.decrypt(notes, 'my-secret-key@123')
        const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

        const userTickerObj = {
            name: dName || "",
            gender: dGender || "",
            fromLocation: dFromLocation || "",
            toLocation: dToLocation || "",
            date: dDate || "",
            time: dTime || "",
            amount: dAmount || "",
            notes: dNotes || "",
            id: Math.floor(Math.random() * 10000000000)
        }

        console.log("User Ticket info:", userTickerObj)
        setUserFormData(userTickerObj)

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
                        setDisplay("hideForm")
                        setMessage(true)
                        alert("Successfully Added data to the DB")
                    }
                    if (!success) {
                        setDisplay("hideForm")
                        seteMessage(true)
                        alert("The name Already Exist! ")
                    }
                })
        } catch (err) {
            console.log(err);
        }

    };


    // const getDate = async () => {
    //     console.log("getting data")
    //     try {

    //         const data = { name: "add", age: 20 }

    //         fetch('http://localhost:8080/send', {
    //             method: 'POST',
    //             headers: { 'content-type': 'application/json' },
    //             body: JSON.stringify(data)
    //         })
    //             .then(res => res.json())
    //             .then(success => {
    //                 if (success) {
    //                     console.log('data created successfully.', success);
    //                     nextFormStep()
    //                 }
    //             })
    //     } catch (err) {
    //         console.log(err);
    //         alert("Error Form Submission")
    //     }
    // }



    return (
        <div>
            {/* <div className={`${display}`}> */}

            <div className={formStep >= 5 ? `${display}` : "hideForm"}>
                <div className='p-5'>
                    {
                        userFormData &&
                        <div>
                            <p>Name : {userFormData.name}</p>
                            <p>Gender : {userFormData.gender}</p>
                            <p>From : {userFormData.fromLocation}</p>
                            <p>To : {userFormData.toLocation}</p>
                            <p>Date : {userFormData.date}</p>
                            <p>Time : {userFormData.time}</p>
                            <p>Amount : {userFormData.amount}</p>
                            <p>Notes : </p>
                            <textarea className='w-100' rows={8} value={userFormData.notes} />

                        </div>
                    }
                    <br />
                    <div className="text-end">
                        <button onClick={onSubmit} className='btn btn-secondary btn-sm text-center' type="submit">Submit</button>
                    </div>
                </div>


            </div>
            {
                message &&
                <div className='p-5'>
                    <p>Thank you !</p>
                    <p>Your Reservation ID is: {userFormData.id}</p>
                </div>
                // formStep >= 5 &&
            }
            {
                emessage &&
                <div className='p-5'>
                    {/* <div className={formStep >= 5 & `showForm`}>
                        <p>Error !</p>
                        <p>The Name Already Exist</p>
                    </div> */}
                    <p>Error !</p>
                    <p>The Name Already Exist</p>
                </div>
            }
        </div>
    );
};


export default SendingForm;