
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
    </div>
    );
};

export default AmountForm;