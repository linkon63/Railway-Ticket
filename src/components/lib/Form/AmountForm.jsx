import React, { useContext } from 'react';
import { FormContext } from '../../../App';
import { useForm } from "react-hook-form";
var CryptoJS = require("crypto-js");
const AmountForm = ({ formStep, nextFormStep }) => {
    const [data, setData] = useContext(FormContext)
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });

    const onSubmit = (values) => {
        try {
            console.log("Value:", values)
            const amount = values.amount
            const eAmount = CryptoJS.AES.encrypt(amount, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kAmount = (key[0])
            localStorage.setItem(`${kAmount}`, `${eAmount}`)
            setData({ ...data, values })
            nextFormStep();

        } catch (error) {
            console.log("step 2", error)
        }
    };
    return (
        <div className={formStep === 3 ? "showForm" : "hideForm"}>
            <div className="p-5">
                <h4>Amount Form</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="number">Amount (BDT)</label> <br />
                        <input
                            type="number"
                            id="number"
                            className='w-100'
                            {...register("amount", {
                                required: true,
                            })}
                        />
                        <br /> <br />
                        <div className="text-end">
                            <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AmountForm;