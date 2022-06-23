import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
var CryptoJS = require("crypto-js");

const Location = ({ nextFormStep, prevFormStep, formStep }) => {
    const { handleSubmit, reset, formState: { errors }, register, } = useForm({});
    const [formData, setFormData] = useState({})
    useEffect(() => {
        const localStorageData = { ...localStorage }
        const { fromLocation, toLocation } = localStorageData

        const dFromLocationByte = fromLocation ? CryptoJS.AES.decrypt(fromLocation, 'my-secret-key@123') : ""
        const dFromLocation = (dFromLocationByte.toString(CryptoJS.enc.Utf8))

        const dToLocationByte = toLocation ? CryptoJS.AES.decrypt(toLocation, 'my-secret-key@123') : ""
        const dToLocation = (dToLocationByte.toString(CryptoJS.enc.Utf8))

        setFormData({ fromLocation: dFromLocation, toLocation: dToLocation })
        console.log("Step-2")

    }, [formStep])

    useEffect(() => {
        reset(formData)
    }, [formData])


    const onSubmit = (values) => {
        try {
            const form = values.fromLocation
            const to = values.toLocation
            const eFrom = CryptoJS.AES.encrypt(form, 'my-secret-key@123').toString()
            const eTo = CryptoJS.AES.encrypt(to, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kForm = (key[0])
            const kTo = (key[1])
            localStorage.setItem(`${kForm}`, `${eFrom}`)
            localStorage.setItem(`${kTo}`, `${eTo}`)
            console.log("Value:", values)
            nextFormStep();

        } catch (error) {
            console.log("step 2", error)
        }
    };


    return (
        <div className='p-5'>
            <div className={formStep == 1 ? "showForm" : "hideForm"}>
                <h6>Step 2 : Location</h6>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>Form </span>
                    <br />
                    <select {...register("fromLocation", { required: true })} className="w-100">
                        <option value="東京">東京</option>
                        <option value="横浜">横浜</option>
                    </select>
                    <br />
                    <br />
                    <span className='me-1'>To </span>
                    <br />
                    <select {...register("toLocation", { required: true })} className="w-100">
                        <option value="名古屋">名古屋</option>
                        <option value="大阪">大阪</option>
                    </select>
                    <br /><br />
                    <div className="d-flex justify-content-between">
                        <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
                        <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                    </div>
                </form>

            </div>
        </div >
    );
};

export default Location;

// import React, { useContext } from 'react';
// import { useForm } from "react-hook-form";
// import { FormContext } from '../../../App';

// var CryptoJS = require("crypto-js");

// const Location = ({ formStep, nextFormStep }) => {

//     const [data, setData] = useContext(FormContext)
//     const {
//         handleSubmit,
//         formState: { errors },
//         register,
//     } = useForm({ mode: "all" });

//     const onSubmit = (values) => {
//         try {
//             // console.log("Value:", values)
//             const form = values.fromLocation
//             const to = values.toLocation
//             const eFrom = CryptoJS.AES.encrypt(form, 'my-secret-key@123').toString()
//             const eTo = CryptoJS.AES.encrypt(to, 'my-secret-key@123').toString()
//             const key = Object.keys(values)
//             const kForm = (key[0])
//             const kTo = (key[1])
//             localStorage.setItem(`${kForm}`, `${eFrom}`)
//             localStorage.setItem(`${kTo}`, `${eTo}`)
//             setData({ ...data, values })
//             nextFormStep();

//         } catch (error) {
//             console.log("step 2", error)
//         }
//     };

//     const getData = () => {

//         // const name = localStorage.getItem('name')
//         // const gender = localStorage.getItem('gender')

//         // const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
//         // const dName = (dNameByte.toString(CryptoJS.enc.Utf8))
//         // console.log("ename:", name)
//         // console.log("dName:", dName)

//         // const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
//         // const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

//         // console.log("egender:", gender)
//         // console.log("dgender:", dGender)

//     }


//     return (
//         <div className={formStep === 1 ? "showForm" : "hideForm"}>
//             <div className="p-5">
//                 <h4>Location</h4>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <span>Form </span>
//                     <br />
//                     <select {...register("fromLocation")} className="w-100">
//                         <option value="dhaka">Dhaka</option>
//                         <option value="sylhet">Sylhet</option>
//                         <option value="comilla">Comilla</option>
//                     </select>
//                     <br />
//                     <br />
//                     <span className='me-1'>To </span>
//                     <br />
//                     <select {...register("toLocation")} className="w-100">
//                         <option value="chitagang">Chitagang</option>
//                         <option value="kustia">Kustia</option>
//                         <option value="habiganj">Habiganj</option>
//                     </select>
//                     <br /><br />
//                     <div className='text-end'
//                     // style={{ position: "absolute", top: "47%", left: "70%" }}
//                     >
//                         <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Location;