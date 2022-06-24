import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../Form/Styles/FormStyle.css'
var CryptoJS = require("crypto-js");

const HomeComponent = () => {
    const navigate = useNavigate()
    const { handleSubmit, setValue, getValues, formState: { errors }, register, } = useForm({});
    const [radioData, setRadioData] = useState('')
    const [formValue, setFormValue] = useState({ gender: "no" })
    useEffect(() => {
        console.log("Step-1")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            // Decrypt
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            // console.log("Enc", Enc)
            const { name, gender } = decryptedData
            console.log("Data-1:", decryptedData)
            setRadioData(gender ? gender : '')
            setFormValue({ ...decryptedData })
            setValue('name', name ? name : "", 'gender', gender)
        }

    }, [])

    const next = () => {
        console.log("Next page")
        navigate("/step2")
    }

    const onSubmit = (values) => {

        try {
            const name = values.name
            let gender = (values.gender == null ? radioData : values.gender)
            const detailsObj = [{ ...formValue, name: name, gender: gender }]
            // console.log("get val Obj", getValues('name'))
            // console.log("Details Obj", detailsObj)

            // Encrypt

            var detail = CryptoJS.AES.encrypt(JSON.stringify(detailsObj), 'secret key 123').toString();
            localStorage.setItem("Enc", `${detail}`)

            next()

        } catch (error) {
            console.log("Step 1 Form Error", error)
        }


    }

    return (
        <div className='p-5'>
            <p>Step 1 : Details</p>

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
                                name="gender"
                                type="radio"
                                value="on"
                                id="field-gender"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setRadioData(e.target.value)
                                }}
                                checked={radioData == 'on' ? true : false}
                            />
                            Male
                        </label>

                    </div>
                    <div className='ms-5'>
                        <label htmlFor="field-gender">
                            <input
                                {...register("gender")}
                                name="gender"
                                type="radio"
                                value="off"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setRadioData(e.target.value)
                                }}
                                checked={radioData == 'off' ? true : false}
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
                        < button className='btn btn-secondary btn-sm text-center' type="submit" > Next</button>
                        {/* <button >Next</button> */}
                    </div>
                </div>
            </form >
        </div >
    );
};

export default HomeComponent;

// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';

// import { FormContext } from '../../../App';


// import AmountForm from '../Form/AmountForm';
// import DetailsForm from '../Form/DetailsForm';
// import FormCard from '../Form/FormCard';
// import Location from '../Form/Location';
// import NotesFrom from '../Form/NotesFrom';
// import SendingForm from '../Form/SendingForm';
// import TimeForm from '../Form/TimeForm';
// import '../Home/HomeComponent.css'
// var CryptoJS = require("crypto-js");

// const HomeComponent = () => {
//     const [data, setData] = useContext(FormContext)
//     const [loader, setLoader] = useState(false)
//     const [formStep, setFormStep] = useState(0)
//     const { handleSubmit, reset, formState: { errors }, register, } = useForm({});

//     useEffect(() => {
//         console.log("Form Step:", formStep)
//         console.log("Data:", data)
//     }, [formStep])

//     const nextFormStep = () => {
//         if (formStep >= 4) {
//             setLoader(false)
//         } else {
//             setLoader(true)
//         }
//         setTimeout(() => {
//             console.log('Hello, World! Stop Loader')
//             setLoader(false)
//         }, 300)
//         setFormStep((currentStep) => currentStep + 1)
//     }
//     const prevFormStep = () => {
//         setFormStep((currentStep) => currentStep - 1)
//     }



//     return (
//         <div>

//             {
//                 formStep >= 0 &&
//                 <div>
//                     <DetailsForm nextFormStep={nextFormStep} formStep={formStep} />
//                 </div>
//             }

//             {
//                 loader ?
//                     <div className='d-flex justify-content-center mt-5 pt-5'>
//                         {
//                             formStep == 1 &&
//                             <div className="loader"></div>
//                         }
//                     </div>
//                     :
//                     <div>
//                         {
//                             formStep >= 1 &&
//                             <div>
//                                 <Location nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
//                             </div>
//                         }
//                     </div>
//             }

//             {
//                 loader ?
//                     <div className='d-flex justify-content-center mt-5 pt-5'>
//                         {
//                             formStep == 2 &&
//                             <div className="loader"></div>
//                         }
//                     </div>
//                     :
//                     formStep >= 2 &&
//                     <div>
//                         <TimeForm nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
//                     </div>
//             }
//             {
//                 loader ?
//                     <div className='d-flex justify-content-center '>
//                         {
//                             formStep == 3 &&
//                             <div className="loader"></div>
//                         }
//                     </div>
//                     :
//                     formStep >= 3 &&
//                     <div>
//                         <AmountForm nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
//                     </div>
//             }
//             {
//                 loader ?
//                     <div className='d-flex justify-content-center'>
//                         {
//                             formStep == 4 &&
//                             <div className="loader"></div>
//                         }
//                     </div>
//                     :
//                     formStep >= 4 &&
//                     <NotesFrom nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
//             }
//             {
//                 formStep >= 5 &&
//                 <SendingForm nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
//             }
//         </div >
//     );
// };

// export default HomeComponent;