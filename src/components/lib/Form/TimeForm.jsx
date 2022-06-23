
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
var CryptoJS = require("crypto-js");
const TimeForm = ({ nextFormStep, prevFormStep, formStep }) => {

    const { handleSubmit, reset, formState: { errors }, register, } = useForm({});
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const localStorageData = { ...localStorage }
        const { date, time } = localStorageData

        const dDateByte = date ? CryptoJS.AES.decrypt(date, 'my-secret-key@123') : ""
        const dDate = (dDateByte.toString(CryptoJS.enc.Utf8))

        const dTimeByte = time ? CryptoJS.AES.decrypt(time, 'my-secret-key@123') : ""
        const dTime = (dTimeByte.toString(CryptoJS.enc.Utf8))

        setFormData({ date: dDate, time: dTime })
        console.log("Step-3")

    }, [formStep])

    useEffect(() => {
        reset(formData)
    }, [formData])


    const onSubmit = (values) => {
        try {
            const date = values.date
            const time = values.time
            const eDate = CryptoJS.AES.encrypt(date, 'my-secret-key@123').toString()
            const eTime = CryptoJS.AES.encrypt(time, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kDate = (key[0])
            const kTime = (key[1])
            localStorage.setItem(`${kDate}`, `${eDate}`)
            localStorage.setItem(`${kTime}`, `${eTime}`)
            console.log("Value:", values)
            nextFormStep();

        } catch (error) {
            console.log("step 2", error)
        }
    };


    return (
        <div className='ps-5 pe-5'>
            <div className={formStep == 2 ? "showForm" : "hideForm"}>
                <h6>Step 3 : Time Form</h6>
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
                    />
                    <br /> <br />
                    <label htmlFor="time">Time</label> <br />
                    <input
                        type="time"
                        id="time"
                        className='w-100'
                        {...register("time", {
                            required: true,
                        })}
                    />
                    <br />  <br />
                    <div className="d-flex justify-content-between">
                        <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
                        <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TimeForm;

// import React, { useContext } from 'react';
// import { FormContext } from '../../../App';
// import { useForm } from "react-hook-form";

// import './../Form/Styles/FormStyle.css'
// var CryptoJS = require("crypto-js");

// const TimeForm = ({ formStep, nextFormStep }) => {
//     const [data, setData] = useContext(FormContext)
//     const {
//         handleSubmit,
//         formState: { errors },
//         register,
//     } = useForm({ mode: "all" });

//     const onSubmit = (values) => {
//         try {
//             // console.log("Value:", values)
//             const date = values.date
//             const time = values.time
//             const eDate = CryptoJS.AES.encrypt(date, 'my-secret-key@123').toString()
//             const eTime = CryptoJS.AES.encrypt(time, 'my-secret-key@123').toString()
//             const key = Object.keys(values)
//             const kDate = (key[0])
//             const kTime = (key[1])
//             localStorage.setItem(`${kDate}`, `${eDate}`)
//             localStorage.setItem(`${kTime}`, `${eTime}`)
//             setData({ ...data, values })
//             nextFormStep();

//         } catch (error) {
//             console.log("step 2", error)
//         }
//     };

//     return (
//         <div className={formStep === 2 ? "showForm" : "hideForm"}>
//             <div className="p-5">
//                 <h4>Time Form</h4>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <label htmlFor="date">Date</label> <br />
//                         <input
//                             type="date"
//                             id="date"
//                             className='w-100'
//                             {...register("date", {
//                                 required: true,
//                             })}
//                         />
//                         <br /> <br />
//                         <label htmlFor="time">Time</label> <br />
//                         <input
//                             type="time"
//                             id="time"
//                             className='w-100'
//                             {...register("time", {
//                                 required: true,
//                             })}
//                         />
//                         <br />  <br />
//                         <div className="text-end">
//                             <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TimeForm;