import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../App';
import { useForm } from "react-hook-form";
var CryptoJS = require("crypto-js");
const SendingForm = ({ formStep, nextFormStep }) => {
    const [data, setData] = useContext(FormContext)
    const [userFormData, setUserFormData] = useState({})

    useEffect(() => {
        // const items = { ...localStorage }
        // console.log("local Storage data", items)

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

    const onSubmit = () => {
        console.log("Value:", data)
    };
    return (
        <div className={formStep === 5 ? "showForm" : "hideForm"}>
            <div className='p-5'>
                {
                    userFormData &&
                    <div>
                        <p>Name : {userFormData.name}</p>
                        <p>Gender : {userFormData.gender}</p>
                        <p>From : {userFormData.fromLocation}</p>
                        <p>To : {userFormData.toLocation}</p>
                        <p>Date : {userFormData.date}</p>
                        <p>Time : {userFormData.amount}</p>
                        <p>Notes : </p>
                        <textarea className='w-100' rows={8} value={userFormData.notes} />

                    </div>
                }
                <br />
                <div className="text-end">
                    <button className='btn btn-secondary btn-sm text-center' type="submit">Submit</button>
                </div>
            </div>
        </div>
    );
};


export default SendingForm;