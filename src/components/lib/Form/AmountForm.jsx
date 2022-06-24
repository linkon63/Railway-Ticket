
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

var CryptoJS = require("crypto-js");

const AmountForm = () => {
    const navigate = useNavigate()
    const { handleSubmit, reset, formState: { errors }, register, } = useForm({});
    const [showForm, setShowForm] = useState('hideForm')
    useEffect(() => {
        setTimeout(() => { setShowForm('showForm') }, 700)
        console.log("Step-4")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
              // Decrypt
              var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
              var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            //   console.log(decryptedData)
              if (decryptedData.amount) {
                reset({amount:decryptedData.amount})
              }
        }
    }, [])

    const onSubmit = (values) => {
        console.log("On submit")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            const amountData = [{ ...decryptedData, amount: values.amount }]
            var amount = CryptoJS.AES.encrypt(JSON.stringify(amountData), 'secret key 123').toString();
            localStorage.setItem("Enc", `${amount}`)
        }
        next()
    }


    const next = () => {
        console.log("Next page")
        navigate("/step5")
    }
    const previous = () => {
        console.log("previous page")
        navigate("/step3")
    }
    return (
        <div className='p-5'>
             {
                showForm == 'hideForm' &&
                <div className="d-flex justify-content-center">
                    <div className="loader"></div>
                </div>
            }
       <div className={`${showForm}`}>
       <p>Step 4 : Amount</p>
        <form onSubmit={handleSubmit(onSubmit)}>
                         <div>

                             <p className='m-0 p-0'>Amount:"BDT * 1.47 </p>
                             <div className="input-group">
                                 <span className="input-group-text" id="basic-addon1">¥</span>
                                 <input
                                    type="number"
                                    id="number"

                                    {...register("amount", {
                                        required: true,
                                        min: 1,
                                        max: 99999999
                                    })}
                                    className="form-control" placeholder="Amount" aria-label="number" aria-describedby="basic-addon1"
                                />
                                <br />
                            </div>
                            {errors.amount && (
                                <p className='m-0 p-0 text-danger'>
                                    Amount can't be a negative or empty or max 8 Digit**
                                </p>
                            )}

                            <br /> <br />
                            <div className="d-flex justify-content-between">
                                <button className='btn btn-secondary btn-sm text-center' onClick={previous}>Previous</button>
                                <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                            </div>
                        </div>
                    </form>
       </div>


        {/* <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button> */}
    </div>
    );
};

export default AmountForm;
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// var CryptoJS = require("crypto-js");

// const AmountForm = ({ nextFormStep, prevFormStep, formStep }) => {

//     const { handleSubmit, reset, formState: { errors }, register, } = useForm({});
//     const [formData, setFormData] = useState({})

//     useEffect(() => {
//         const localStorageData = { ...localStorage }
//         const { amount } = localStorageData

//         const dAmountByte = amount ? CryptoJS.AES.decrypt(amount, 'my-secret-key@123') : ""
//         const dAmount = (dAmountByte.toString(CryptoJS.enc.Utf8))

//         setFormData({ amount: dAmount })
//         console.log("Step-4")

//     }, [formStep])

//     useEffect(() => {
//         reset(formData)
//     }, [formData])


//     const onSubmit = (values) => {
//         try {
//             let amount = values.amount
//             amount = parseInt(amount)
//             amount = (amount * (1.47))
//             let floatAmount = amount.toFixed(2)
//             amount = parseInt(amount)
//             amount = amount + ""
           
//             console.log("Amount:", amount)
//             console.log("Amount:", floatAmount)
           
//             const eAmount = CryptoJS.AES.encrypt(amount, 'my-secret-key@123').toString()
//             const eFloatAmount = CryptoJS.AES.encrypt(floatAmount, 'my-secret-key@123').toString()

//             const key = Object.keys(values)
//             const kAmount = (key[0])
            
//             localStorage.setItem(`${kAmount}`, `${eAmount}`)
//             localStorage.setItem(`floatAmount`, `${eFloatAmount}`)
//             console.log("Value:", values)
//             nextFormStep();

//         } catch (error) {
//             console.log("step 2", error)
//         }
//     };

//     return (
//         <div className='ps-5 pe-5'>
//             <div className={formStep == 3 ? "showForm" : "hideForm"}>
//                 <h6>Step 4 : Amount</h6>
//                 <div className="">
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div>

//                             <p className='m-0 p-0'>Amount:"BDT * 1.47 </p>
//                             <div className="input-group">
//                                 <span className="input-group-text" id="basic-addon1">¥</span>
//                                 <input
//                                     type="number"
//                                     id="number"

//                                     {...register("amount", {
//                                         required: true,
//                                         min: 1,
//                                         max: 99999999
//                                     })}
//                                     className="form-control" placeholder="Amount" aria-label="number" aria-describedby="basic-addon1"
//                                 />
//                                 <br />
//                             </div>
//                             {errors.amount && (
//                                 <p className='m-0 p-0 text-danger'>
//                                     Amount can't be a negative or empty or max 8 Digit**
//                                 </p>
//                             )}

//                             {/* <label htmlFor="number">Amount:"BDT * 1.47 </label> <br />
//                                 <input
//                                     type="number"
//                                     id="number"
//                                     className='w-100'

//                                     {...register("amount", {
//                                         required: true,
//                                         min: 0
//                                     })}
//                                 /> */}
//                             <br /> <br />
//                             <div className="d-flex justify-content-between">
//                                 <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
//                                 <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AmountForm;

// // import React, { useContext, useState } from 'react';
// // import { FormContext } from '../../../App';
// // import { useForm } from "react-hook-form";
// // import { type } from '@testing-library/user-event/dist/type';
// // var CryptoJS = require("crypto-js");
// // const AmountForm = ({ formStep, nextFormStep }) => {
// //     const [data, setData] = useContext(FormContext)
// //     const [amountData, setAmountData] = useState({})
// //     const [SamountData, setSmountData] = useState({})
// //     const {
// //         handleSubmit,
// //         formState: { errors },
// //         register,
// //     } = useForm({ mode: "all" });


// //     const onChange = (values) => {
// //         // console.log(values)
// //         let number = parseFloat(values.amount);

// //         let number3 = number.toLocaleString('en-US', { maximumFractionDigits: 2 })
// //         // console.log(number3, typeof (number3))
// //         setSmountData(values)
// //         setAmountData({ amount: number3 })
// //     }

// //     const onSubmit = (values) => {
// //         try {
// //             // console.log("Value:", values)

// //             // default behaviour on a machine with a local that uses commas for numbers
// //             let number = parseFloat(values.amount);
// //             number.toLocaleString(); // "1,234,567,890"

// //             // With custom settings, forcing a "US" locale to guarantee commas in output
// //             let number2 = 1234.56789; // floating point example
// //             let number3 = number2.toLocaleString('en-US', { maximumFractionDigits: 2 }) // "1,234.57"

// //             // console.log("Parse Number", number3)

// //             let amount = values.amount * (1.47)
// //             amount = parseInt(amount) + ""
// //             const eAmount = CryptoJS.AES.encrypt(amount, 'my-secret-key@123').toString()
// //             const key = Object.keys(values)
// //             const kAmount = (key[0])
// //             localStorage.setItem(`${kAmount}`, `${eAmount}`)
// //             setData({ ...data, values })
// //             nextFormStep();

// //         } catch (error) {
// //             console.log("step 2", error)
// //         }
// //     };
// //     return (
// //         <div className={formStep === 3 ? "showForm" : "hideForm"}>
// //             <div className="p-5">
// //                 <h4>Amount Form</h4>
// //                 <form onChange={handleSubmit(onChange)}>
// //                     <div>
// //                         <label htmlFor="number">Amount:"BDT * 1.47 : {amountData.amount}"</label> <br />
// //                         <input
// //                             type="number"
// //                             id="number"
// //                             className='w-100'

// //                             {...register("amount", {
// //                                 required: true,
// //                                 min: 0
// //                             })}
// //                         />
// //                         <br /> <br />
// //                         <button onClick={() => onSubmit(SamountData)} className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
// //                     </div>
// //                 </form>
// //                 <div className="text-end">
// //                     {
// //                         // amountData.amount + 0 > 0 ?
// //                         //     <p>Type big value</p>
// //                         //     :
// //                         //     <button onClick={() => onSubmit(SamountData)} className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
// //                     }
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };


// // export default AmountForm;