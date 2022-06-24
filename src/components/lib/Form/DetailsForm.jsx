import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from '../../../App';
import '../Form/Styles/FormStyle.css'
var CryptoJS = require("crypto-js");

const DetailsForm = ({ nextFormStep, formStep }) => {

    const { handleSubmit, reset, formState: { errors }, register, } = useForm({});
    const [formData, setFormData] = useState({})
    useEffect(() => {
        const localStorageData = { ...localStorage }
        console.log("Local Storage:", localStorageData)

        if (localStorageData.Enc) {
            const Enc = localStorageData.Enc
            console.log("Enc-2", Enc)
            // Decrypt
            var bytes = Enc ? CryptoJS.AES.decrypt(Enc, 'secret key 123') : {};
            var decryptedData = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : "";
            const { name, gender } = decryptedData
            const dName = name ? name : ""
            const dGender = gender ? gender : ""
            setFormData({ name: dName, gender: dGender })
            console.log("Step-1")
        }

    }, [formStep])

    useEffect(() => {
        reset(formData)
    }, [formData])


    const onSubmit = (values) => {
        try {
            const name = values.name
            let gender = (values.gender == null ? "no" : values.gender)

            const detailsObj = { name: name, gender: gender }
            console.log("Details Obj", detailsObj)

            // Encrypt
            var detail = CryptoJS.AES.encrypt(JSON.stringify(detailsObj), 'secret key 123').toString();
            console.log("Enc", detail)
            localStorage.setItem("Enc", `${detail}`)
            nextFormStep()


            // Decrypt
            // var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // console.log("decryptedData", decryptedData)


            // const eName = CryptoJS.AES.encrypt(name, 'my-secret-key@123').toString()
            // const eGender = CryptoJS.AES.encrypt(gender, 'my-secret-key@123').toString()
            // const key = Object.keys(values)
            // const kName = (key[0])
            // const kGender = (key[1])
            // localStorage.setItem(`${kName}`, `${eName}`)
            // localStorage.setItem(`${kGender}`, `${eGender}`)
            // console.log(values)

        } catch (error) {
            console.log("Step 1 Form Error", error)
        }
    };
    return (
        <div className=''>
            <div className={formStep === 0 ? "showForm" : "hideForm"}>
                <div className="p-5">
                    <h6>Step 1 : Details</h6>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=''>
                            <label htmlFor="name">*Name</label>
                            <br />
                            <input
                                className='w-100'
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors.name && (
                                <p>
                                    Name is required**
                                </p>
                            )}
                            <br />
                            <br />
                            <span>Gender:</span> <br />
                            <div className='ms-5'>
                                <label htmlFor="field-gender">
                                    <input
                                        {...register("gender")}
                                        type="radio"
                                        value="male"
                                        id="field-gender"
                                    />
                                    Male
                                </label>
                            </div>
                            <div className='ms-5'>
                                <label htmlFor="field-gender">
                                    <input
                                        {...register("gender")}
                                        type="radio"
                                        value="female"
                                        id="field-gender"
                                    />
                                    Female
                                </label>
                            </div>

                            <div className='text-end'>
                                {errors.name && (
                                    <p className='text-danger'>
                                        Name is required
                                    </p>
                                )}
                                <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailsForm;

// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FormContext } from '../../../App';
// import '../Form/Styles/FormStyle.css'
// var CryptoJS = require("crypto-js");

// const DetailsForm = ({ formStep, nextFormStep }) => {

//     const [data, setData] = useContext(FormContext)
//     const {
//         handleSubmit,
//         formState: { errors },
//         register,
//     } = useForm({ mode: "all" });

//     const onSubmit = (values) => {
//         try {
//             const name = values.name
//             let gender = (values.gender == null ? "no" : values.gender)
//             const eName = CryptoJS.AES.encrypt(name, 'my-secret-key@123').toString()
//             const eGender = CryptoJS.AES.encrypt(gender, 'my-secret-key@123').toString()
//             const key = Object.keys(values)
//             const kName = (key[0])
//             const kGender = (key[1])
//             setData({ ...data, values })
//             localStorage.setItem(`${kName}`, `${eName}`)
//             localStorage.setItem(`${kGender}`, `${eGender}`)
//             nextFormStep()
//         } catch (error) {
//             console.log("Step 1 Form Error", error)
//         }
//     };



//     return (
//         <div className={formStep === 0 ? "showForm" : "hideForm"}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className='mt-5 p-5'>
//                     <label htmlFor="name">*Name</label>
//                     <br />
//                     <input
//                         className='w-100'
//                         type="text"
//                         id="name"
//                         {...register("name", {
//                             required: true,
//                         })}
//                     />
//                     {errors.name && (
//                         <p>
//                             Name is required**
//                         </p>
//                     )}
//                     <br />
//                     <br />
//                     <span>Gender:</span> <br />
//                     <div className='ms-5'>
//                         <label htmlFor="field-gender">
//                             <input
//                                 {...register("gender")}
//                                 type="radio"
//                                 value="male"
//                                 id="field-gender"
//                             />
//                             Male
//                         </label>
//                     </div>
//                     <div className='ms-5'>
//                         <label htmlFor="field-gender">
//                             <input
//                                 {...register("gender")}
//                                 type="radio"
//                                 value="female"
//                                 id="field-gender"
//                             />
//                             Female
//                         </label>
//                     </div>

//                     <div className='text-end'>
//                         {errors.name && (
//                             <p className='text-danger'>
//                                 Name is required
//                             </p>
//                         )}
//                         <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default DetailsForm;