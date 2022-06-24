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
            // console.log("Use Effect DetailObj 2", decryptedData)
            const { fromLocation, toLocation } = decryptedData
            setFLocation(fromLocation ? fromLocation : "")
            setTLocation(toLocation ? toLocation : "")

        }

    }, [])

    const onSubmit = (values) => {
        // console.log(values)
        // console.log(fLocation, tLocation)
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];

            const locationData = [{ ...decryptedData, toLocation: tLocation ? tLocation : values.toLocation, fromLocation: fLocation ? fLocation : values.fromLocation }]
            // console.log("location Data", locationData)
            var location = CryptoJS.AES.encrypt(JSON.stringify(locationData), 'secret key 123').toString();
            localStorage.setItem("Enc", `${location}`)
            next()
        } else {
            // console.log("No ENC in Location")
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
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FormContext } from '../../../App';
// var CryptoJS = require("crypto-js");

// const Location = ({ nextFormStep, prevFormStep, formStep }) => {
//     const { handleSubmit, reset, getValues, formState: { errors }, register, } = useForm({});
//     // const [formData, setFormData] = useState({})
//     const [data, setData] = useContext(FormContext)
//     useEffect(() => {

//         // console.log("useForm:", getValues())

//         const localStorageData = { ...localStorage }
//         const Enc = localStorageData.Enc
//         if (Enc) {
//             var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
//             var decryptedData = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : "";
//             console.log("decryptedData:", decryptedData)
//             const { fromLocation, toLocation } = decryptedData
//             if (fromLocation || toLocation) {
//                 const locationObj = { fromLocation: fromLocation, toLocation: toLocation }
//                 console.log("locationObj", locationObj)
//                 setData({ ...data, ...locationObj })
//                 // setFormData(locationObj)
//             }
//         }

//         //     console.log("decryptedData-2", decryptedData)
//         //     const { fromLocation, toLocation } = decryptedData
//         //     if (fromLocation || toLocation) {
//         //         const locationObj = { fromLocation: fromLocation, toLocation: toLocation }
//         //         console.log("locationObj", locationObj)
//         //         setData({ ...data, ...locationObj })
//         //         // setFormData(locationObj)
//         //     }
//         // }

//     }, [formStep])

//     useEffect(() => {
//         reset(data)
//     }, [data])


//     const onSubmit = (values) => {
//         try {
//             const localStorageData = { ...localStorage }
//             const Enc = localStorageData.Enc
//             // Decrypt

//             var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
//             var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

//             const form = values.fromLocation
//             const to = values.toLocation

//             const locObj = { fromLocation: form, toLocation: to }


//             const extendedObj = { ...decryptedData, ...locObj }

//             var location = CryptoJS.AES.encrypt(JSON.stringify(extendedObj), 'secret key 123').toString();
//             // console.log("data:", location)
//             localStorage.setItem("Enc", `${location}`)

//             nextFormStep();

//             // Decrypt
//             // var bytes = CryptoJS.AES.decrypt(location, 'secret key 123');
//             // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//             // console.log("decryptedData", decryptedData)

//             // const l = { ...localStorage }
//             // const c = l.Enc
//             // // Decrypt
//             // var bytes = CryptoJS.AES.decrypt(c, 'secret key 123');
//             // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//             // console.log("dc", decryptedData)



//             // const key = Object.keys(values)
//             // const kForm = (key[0])
//             // const kTo = (key[1])
//             // localStorage.setItem(`${kForm}`, `${eFrom}`)
//             // localStorage.setItem(`${kTo}`, `${eTo}`)


//         } catch (error) {
//             console.log("step 2", error)
//         }
//     };


//     return (
//         <div className='p-5'>
//             <div className={formStep == 1 ? "showForm" : "hideForm"}>
//                 <h6>Step 2 : Location</h6>

//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <span>Form </span>
//                     <br />
//                     <select {...register("fromLocation", { required: true })} className="w-100">
//                         {/* <select {...register("fromLocation", { required: true, value: `${getValues().fromLocation}` })} className="w-100"> */}
//                         <option value="東京 A">東京 A</option>
//                         <option value="横浜 B">横浜 B</option>
//                     </select>
//                     <br />
//                     <br />
//                     <span className='me-1'>To </span>
//                     <br />
//                     <select {...register("toLocation", { required: true })} className="w-100">
//                         <option value="名古屋 C">名古屋 C</option>
//                         <option value="大阪 D">大阪 D</option>
//                     </select>
//                     <br /><br />
//                     <div className="d-flex justify-content-between">
//                         <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
//                         <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
//                     </div>
//                 </form>

//             </div>
//         </div >
//     );
// };

// export default Location;

// // import React, { useContext } from 'react';
// // import { useForm } from "react-hook-form";
// // import { FormContext } from '../../../App';

// // var CryptoJS = require("crypto-js");

// // const Location = ({ formStep, nextFormStep }) => {

// //     const [data, setData] = useContext(FormContext)
// //     const {
// //         handleSubmit,
// //         formState: { errors },
// //         register,
// //     } = useForm({ mode: "all" });

// //     const onSubmit = (values) => {
// //         try {
// //             // console.log("Value:", values)
// //             const form = values.fromLocation
// //             const to = values.toLocation
// //             const eFrom = CryptoJS.AES.encrypt(form, 'my-secret-key@123').toString()
// //             const eTo = CryptoJS.AES.encrypt(to, 'my-secret-key@123').toString()
// //             const key = Object.keys(values)
// //             const kForm = (key[0])
// //             const kTo = (key[1])
// //             localStorage.setItem(`${kForm}`, `${eFrom}`)
// //             localStorage.setItem(`${kTo}`, `${eTo}`)
// //             setData({ ...data, values })
// //             nextFormStep();

// //         } catch (error) {
// //             console.log("step 2", error)
// //         }
// //     };

// //     const getData = () => {

// //         // const name = localStorage.getItem('name')
// //         // const gender = localStorage.getItem('gender')

// //         // const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
// //         // const dName = (dNameByte.toString(CryptoJS.enc.Utf8))
// //         // console.log("ename:", name)
// //         // console.log("dName:", dName)

// //         // const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
// //         // const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

// //         // console.log("egender:", gender)
// //         // console.log("dgender:", dGender)

// //     }


// //     return (
// //         <div className={formStep === 1 ? "showForm" : "hideForm"}>
// //             <div className="p-5">
// //                 <h4>Location</h4>
// //                 <form onSubmit={handleSubmit(onSubmit)}>
// //                     <span>Form </span>
// //                     <br />
// //                     <select {...register("fromLocation")} className="w-100">
// //                         <option value="dhaka">Dhaka</option>
// //                         <option value="sylhet">Sylhet</option>
// //                         <option value="comilla">Comilla</option>
// //                     </select>
// //                     <br />
// //                     <br />
// //                     <span className='me-1'>To </span>
// //                     <br />
// //                     <select {...register("toLocation")} className="w-100">
// //                         <option value="chitagang">Chitagang</option>
// //                         <option value="kustia">Kustia</option>
// //                         <option value="habiganj">Habiganj</option>
// //                     </select>
// //                     <br /><br />
// //                     <div className='text-end'
// //                     // style={{ position: "absolute", top: "47%", left: "70%" }}
// //                     >
// //                         <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Location;