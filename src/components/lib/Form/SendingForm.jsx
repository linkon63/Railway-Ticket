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
            console.log(decryptedData)

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
// import React, { useEffect, useState } from 'react';
// import { FormContext } from '../../../App';
// import { useForm } from "react-hook-form";
// var CryptoJS = require("crypto-js");
// const SendingForm = ({ nextFormStep, prevFormStep, formStep }) => {

//     const [userFormData, setUserFormData] = useState({})
//     const [display, setDisplay] = useState("showForm")
//     const [message, setMessage] = useState(false)
//     const [emessage, seteMessage] = useState(false)

//     useEffect(() => {
//         const items = { ...localStorage }
//         // console.log("local Storage data", items)

//         const name = localStorage.getItem('name')
//         const gender = localStorage.getItem('gender')
//         const fromLocation = localStorage.getItem('fromLocation')
//         const toLocation = localStorage.getItem('toLocation')
//         const date = localStorage.getItem('date')
//         const time = localStorage.getItem('time')
//         const amount = localStorage.getItem('amount')
//         const floatAmount = localStorage.getItem('floatAmount')
//         const notes = localStorage.getItem('notes')


//         const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
//         const dName = (dNameByte.toString(CryptoJS.enc.Utf8))

//         const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
//         const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

//         const dFromLocationByte = CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123')
//         const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

//         const dTOLocationByte = CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123')
//         const dToLocation = (dTOLocationByte.toString(CryptoJS.enc.Utf8))

//         const dDateByte = CryptoJS.AES.decrypt(date, 'my-secret-key@123')
//         const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

//         const dTimeByte = CryptoJS.AES.decrypt(time, 'my-secret-key@123')
//         const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

//         const dAmountByte = CryptoJS.AES.decrypt(amount, 'my-secret-key@123')
//         const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

//         const dFloatAmountByte = CryptoJS.AES.decrypt(floatAmount, 'my-secret-key@123')
//         const dFloatAmount = (dFloatAmountByte.toString(CryptoJS.enc.Utf8))


//         let number = parseFloat(dFloatAmount);
//         let commaSeparatorNumber = number.toLocaleString()
//         // let commaSeparatorNumber = number.toLocaleString('en-US', { maximumFractionDigits: 2 })



//         console.log("dFloatAmount:", dFloatAmount, typeof (dFloatAmount))

//         const dNotesByte = CryptoJS.AES.decrypt(notes, 'my-secret-key@123')
//         const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

//         const userTickerObj = {
//             name: dName || "",
//             gender: dGender || "",
//             fromLocation: dFromLocation || "",
//             toLocation: dToLocation || "",
//             date: dDate || "",
//             time: dTime || "",
//             amount: dAmount || "",
//             floatAmount: commaSeparatorNumber || "",
//             notes: dNotes || ""
//         }
//         console.log("User Ticket info:", userTickerObj)
//         setUserFormData(userTickerObj)
//     }, [])


//     const onSubmit = async () => {
//         const name = localStorage.getItem('name')
//         const gender = localStorage.getItem('gender')
//         const fromLocation = localStorage.getItem('fromLocation')
//         const toLocation = localStorage.getItem('toLocation')
//         const date = localStorage.getItem('date')
//         const time = localStorage.getItem('time')
//         const amount = localStorage.getItem('amount')
//         const floatAmount = localStorage.getItem('floatAmount')
//         const notes = localStorage.getItem('notes')


//         const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
//         const dName = (dNameByte.toString(CryptoJS.enc.Utf8))

//         const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
//         const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

//         const dFromLocationByte = CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123')
//         const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

//         const dTOLocationByte = CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123')
//         const dToLocation = (dTOLocationByte.toString(CryptoJS.enc.Utf8))

//         const dDateByte = CryptoJS.AES.decrypt(date, 'my-secret-key@123')
//         const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

//         const dTimeByte = CryptoJS.AES.decrypt(time, 'my-secret-key@123')
//         const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

//         const dAmountByte = CryptoJS.AES.decrypt(amount, 'my-secret-key@123')
//         const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

//         const dFloatAmountByte = CryptoJS.AES.decrypt(floatAmount, 'my-secret-key@123')
//         const dFloatAmount = (dFloatAmountByte.toString(CryptoJS.enc.Utf8))

//         const dNotesByte = CryptoJS.AES.decrypt(notes, 'my-secret-key@123')
//         const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

//         const userTickerObj = {
//             name: dName || "",
//             gender: dGender || "",
//             fromLocation: dFromLocation || "",
//             toLocation: dToLocation || "",
//             date: dDate || "",
//             time: dTime || "",
//             amount: dAmount || "",
//             floatAmount: dFloatAmount || "",
//             notes: dNotes || "",
//             id: Math.floor(Math.random() * 10000000000)
//         }

//         console.log("User Ticket info:", userTickerObj)
//         console.log("Sending Data to the db")
//         setUserFormData(userTickerObj)

//         try {

//             fetch('https://railwayticketsystem.herokuapp.com/send', {
//                 method: 'POST',
//                 headers: { 'content-type': 'application/json' },
//                 body: JSON.stringify(userTickerObj)
//             })
//                 .then(res => res.json())
//                 .then(success => {
//                     if (success) {
//                         console.log('data created successfully.', success);
//                         setUserFormData(userTickerObj)
//                         localStorage.clear()
//                         setDisplay("hideForm")
//                         setMessage(true)
//                         alert("Successfully Added data to the DB")
//                     }
//                     if (!success) {
//                         setDisplay("hideForm")
//                         seteMessage(true)
//                         alert("The name Already Exist! ")
//                     }
//                 })
//         } catch (err) {
//             console.log(err);
//         }

//     };


//     const submitForm = () => {
//         console.log("Submit")
//     }

//     return (
//         <div>
//             <div className={formStep >= 5 ? `${display}` : "hideForm"}>
//                 {
//                     userFormData &&
//                     <div className='p-5'>
//                         <p>Name : {userFormData.name}</p>
//                         <p>Gender : {userFormData.gender}</p>
//                         <p>From : {userFormData.fromLocation}</p>
//                         <p>To : {userFormData.toLocation}</p>
//                         <p>Date : {userFormData.date}</p>
//                         <p>Time : {userFormData.time}</p>
//                         <p>Amount: JPY ¥ {userFormData?.floatAmount}</p>
//                         <p>Notes : </p>
//                         <textarea className='w-100' rows={8} value={userFormData.notes} />

//                     </div>
//                 }

//                 <div className="d-flex justify-content-between ps-5 pe-5">
//                     <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
//                     <button onClick={onSubmit} className='btn btn-secondary btn-sm text-center' type="submit">Submit</button>
//                 </div>

//             </div>

//             {
//                 message &&
//                 <div className='p-5'>
//                     <p>Thank you !</p>
//                     <p>Your Reservation ID is: {userFormData.id}</p>
//                 </div>
//             }
//             {
//                 emessage &&
//                 <div className='p-5'>
//                     <p>Error !</p>
//                     <p>The Name Already Exist</p>
//                     <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
//                 </div>
//             }

//         </div>
//     );
// };

// export default SendingForm;

// // import React, { useContext, useEffect, useState } from 'react';
// // import { FormContext } from '../../../App';
// // import { useForm } from "react-hook-form";
// // var CryptoJS = require("crypto-js");
// // const SendingForm = ({ formStep, nextFormStep }) => {
// //     const [data, setData] = useContext(FormContext)
// //     const [userFormData, setUserFormData] = useState({})
// //     const [display, setDisplay] = useState("showForm")
// //     const [message, setMessage] = useState(false)
// //     const [emessage, seteMessage] = useState(false)

// //     useEffect(() => {
// //         const items = { ...localStorage }
// //         // console.log("local Storage data", items)

// //         const name = localStorage.getItem('name')
// //         const gender = localStorage.getItem('gender')
// //         const fromLocation = localStorage.getItem('fromLocation')
// //         const toLocation = localStorage.getItem('toLocation')
// //         const date = localStorage.getItem('date')
// //         const time = localStorage.getItem('time')
// //         const amount = localStorage.getItem('amount')
// //         const notes = localStorage.getItem('notes')


// //         const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
// //         const dName = (dNameByte.toString(CryptoJS.enc.Utf8))

// //         const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
// //         const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

// //         const dFromLocationByte = CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123')
// //         const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

// //         const dTOLocationByte = CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123')
// //         const dToLocation = (dTOLocationByte.toString(CryptoJS.enc.Utf8))

// //         const dDateByte = CryptoJS.AES.decrypt(date, 'my-secret-key@123')
// //         const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

// //         const dTimeByte = CryptoJS.AES.decrypt(time, 'my-secret-key@123')
// //         const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

// //         const dAmountByte = CryptoJS.AES.decrypt(amount, 'my-secret-key@123')
// //         const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

// //         const dNotesByte = CryptoJS.AES.decrypt(notes, 'my-secret-key@123')
// //         const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

// //         const userTickerObj = {
// //             name: dName || "",
// //             gender: dGender || "",
// //             fromLocation: dFromLocation || "",
// //             toLocation: dToLocation || "",
// //             date: dDate || "",
// //             time: dTime || "",
// //             amount: dAmount || "",
// //             notes: dNotes || ""
// //         }
// //         // console.log("User Ticket info:", userTickerObj)
// //         setUserFormData(userTickerObj)
// //     }, [])

// //     const onSubmit = async () => {
// //         const name = localStorage.getItem('name')
// //         const gender = localStorage.getItem('gender')
// //         const fromLocation = localStorage.getItem('fromLocation')
// //         const toLocation = localStorage.getItem('toLocation')
// //         const date = localStorage.getItem('date')
// //         const time = localStorage.getItem('time')
// //         const amount = localStorage.getItem('amount')
// //         const notes = localStorage.getItem('notes')


// //         const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
// //         const dName = (dNameByte.toString(CryptoJS.enc.Utf8))

// //         const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
// //         const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

// //         const dFromLocationByte = CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123')
// //         const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

// //         const dTOLocationByte = CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123')
// //         const dToLocation = (dTOLocationByte.toString(CryptoJS.enc.Utf8))

// //         const dDateByte = CryptoJS.AES.decrypt(date, 'my-secret-key@123')
// //         const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

// //         const dTimeByte = CryptoJS.AES.decrypt(time, 'my-secret-key@123')
// //         const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

// //         const dAmountByte = CryptoJS.AES.decrypt(amount, 'my-secret-key@123')
// //         const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

// //         const dNotesByte = CryptoJS.AES.decrypt(notes, 'my-secret-key@123')
// //         const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

// //         const userTickerObj = {
// //             name: dName || "",
// //             gender: dGender || "",
// //             fromLocation: dFromLocation || "",
// //             toLocation: dToLocation || "",
// //             date: dDate || "",
// //             time: dTime || "",
// //             amount: dAmount || "",
// //             notes: dNotes || "",
// //             id: Math.floor(Math.random() * 10000000000)
// //         }

// //         // console.log("User Ticket info:", userTickerObj)
// //         setUserFormData(userTickerObj)

// //         try {

// //             fetch('https://railwayticketsystem.herokuapp.com/send', {
// //                 method: 'POST',
// //                 headers: { 'content-type': 'application/json' },
// //                 body: JSON.stringify(userTickerObj)
// //             })
// //                 .then(res => res.json())
// //                 .then(success => {
// //                     if (success) {
// //                         console.log('data created successfully.', success);
// //                         setUserFormData(userTickerObj)
// //                         localStorage.clear()
// //                         setDisplay("hideForm")
// //                         setMessage(true)
// //                         alert("Successfully Added data to the DB")
// //                     }
// //                     if (!success) {
// //                         setDisplay("hideForm")
// //                         seteMessage(true)
// //                         alert("The name Already Exist! ")
// //                     }
// //                 })
// //         } catch (err) {
// //             console.log(err);
// //         }

// //     };


// //     // const getDate = async () => {
// //     //     console.log("getting data")
// //     //     try {

// //     //         const data = { name: "add", age: 20 }

// //     //         fetch('http://localhost:8080/send', {
// //     //             method: 'POST',
// //     //             headers: { 'content-type': 'application/json' },
// //     //             body: JSON.stringify(data)
// //     //         })
// //     //             .then(res => res.json())
// //     //             .then(success => {
// //     //                 if (success) {
// //     //                     console.log('data created successfully.', success);
// //     //                     nextFormStep()
// //     //                 }
// //     //             })
// //     //     } catch (err) {
// //     //         console.log(err);
// //     //         alert("Error Form Submission")
// //     //     }
// //     // }



// //     return (
// //         <div>
// //             {/* <div className={`${display}`}> */}

// //             <div className={formStep >= 5 ? `${display}` : "hideForm"}>
// //                 <div className='p-5'>
// //                     {
// //                         userFormData &&
// //                         <div>
// //                             <p>Name : {userFormData.name}</p>
// //                             <p>Gender : {userFormData.gender}</p>
// //                             <p>From : {userFormData.fromLocation}</p>
// //                             <p>To : {userFormData.toLocation}</p>
// //                             <p>Date : {userFormData.date}</p>
// //                             <p>Time : {userFormData.time}</p>
// //                             <p>Amount : {userFormData.amount}</p>
// //                             <p>Notes : </p>
// //                             <textarea className='w-100' rows={8} value={userFormData.notes} />

// //                         </div>
// //                     }
// //                     <br />
// //                     <div className="text-end">
// //                         <button onClick={onSubmit} className='btn btn-secondary btn-sm text-center' type="submit">Submit</button>
// //                     </div>
// //                 </div>


// //             </div>
// //             {
// //                 message &&
// //                 <div className='p-5'>
// //                     <p>Thank you !</p>
// //                     <p>Your Reservation ID is: {userFormData.id}</p>
// //                 </div>
// //                 // formStep >= 5 &&
// //             }
// //             {
// //                 emessage &&
// //                 <div className='p-5'>
// //                     {/* <div className={formStep >= 5 & `showForm`}>
// //                         <p>Error !</p>
// //                         <p>The Name Already Exist</p>
// //                     </div> */}
// //                     <p>Error !</p>
// //                     <p>The Name Already Exist</p>
// //                 </div>
// //             }
// //         </div>
// //     );
// // };


// // export default SendingForm;