import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
var CryptoJS = require("crypto-js");

const Location = ({ nextFormStep, prevFormStep, formStep }) => {
    const { handleSubmit, reset, formState: { errors }, register, } = useForm({});
    const [formData, setFormData] = useState({})
    useEffect(() => {
        const localStorageData = { ...localStorage }
        const Enc = localStorageData.Enc
        if (Enc) {
            console.log("Enc-2", Enc)
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            console.log("decryptedData-2", decryptedData)
            const { fromLocation, toLocation } = decryptedData
            if (fromLocation || toLocation) {
                
            }
        }
        // console.log("Enc-2", Enc)
        // Decrypt
        // var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
        // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log("decryptedData-2", decryptedData)

        // const { fromLocation, toLocation } = decryptedData
        // const dFromLocation = fromLocation ? fromLocation : ""
        // const dToLocation = toLocation ? toLocation : ""

        // console.log("Set get data:", dFromLocation, dToLocation)

        // setFormData({ fromLocation: dFromLocation, toLocation: dToLocation })
        // console.log("Step-2")

    }, [formStep])

    useEffect(() => {
        reset(formData)
    }, [formData])


    const onSubmit = (values) => {
        try {
            const localStorageData = { ...localStorage }
            const Enc = localStorageData.Enc
            // console.log("Enc-2", Enc)
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            // console.log("From Data", decryptedData)

            const form = values.fromLocation
            const to = values.toLocation

            const locObj = { fromLocation: form, toLocation: to }


            const data = { ...decryptedData, ...locObj }
            console.log("data:", data)

            var location = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
            console.log("before", data)
            console.log("Enc", location)
            localStorage.setItem("Enc", `${location}`)

            // Decrypt
            // var bytes = CryptoJS.AES.decrypt(location, 'secret key 123');
            // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // console.log("decryptedData", decryptedData)


            // const l = { ...localStorage }
            // const c = l.Enc
            // // Decrypt
            // var bytes = CryptoJS.AES.decrypt(c, 'secret key 123');
            // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // console.log("dc", decryptedData)

            nextFormStep();


            // const key = Object.keys(values)
            // const kForm = (key[0])
            // const kTo = (key[1])
            // localStorage.setItem(`${kForm}`, `${eFrom}`)
            // localStorage.setItem(`${kTo}`, `${eTo}`)
            console.log("Value:", data)

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