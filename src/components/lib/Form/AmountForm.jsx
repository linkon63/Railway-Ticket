import React, { useContext, useState } from 'react';
import { FormContext } from '../../../App';
import { useForm } from "react-hook-form";
import { type } from '@testing-library/user-event/dist/type';
var CryptoJS = require("crypto-js");
const AmountForm = ({ formStep, nextFormStep }) => {
    const [data, setData] = useContext(FormContext)
    const [amountData, setAmountData] = useState({})
    const [SamountData, setSmountData] = useState({})
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });

    let totalAmount = 0

    const onChange = (values) => {
        console.log(values)
        let number = parseFloat(values.amount);

        let number3 = number.toLocaleString('en-US', { maximumFractionDigits: 2 })
        console.log(number3, typeof (number3))

        // totalAmount = pars
        // if (values.amount.length >= 0) {
        //     setAmountData({ amount: "0" })
        // }
        setSmountData(values)
        setAmountData({ amount: number3 })
    }

    const onSubmit = (values) => {
        try {
            console.log("Value:", values)

            // default behaviour on a machine with a local that uses commas for numbers
            let number = parseFloat(values.amount);
            number.toLocaleString(); // "1,234,567,890"

            // With custom settings, forcing a "US" locale to guarantee commas in output
            let number2 = 1234.56789; // floating point example
            let number3 = number2.toLocaleString('en-US', { maximumFractionDigits: 2 }) // "1,234.57"

            console.log("Parse Number", number3)

            let amount = values.amount * (1.47)
            amount = parseInt(amount) + ""
            // console.log("Amount", amount)
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
                <form onChange={handleSubmit(onChange)}>
                    <div>
                        <label htmlFor="number">Amount:"BDT * 1.47 : {amountData.amount}"</label> <br />
                        <input
                            type="number"
                            id="number"
                            className='w-100'
                            {...register("amount", {
                                required: true,
                            })}
                        // value={data.amount.toFixed(2)}
                        />
                        <br /> <br />
                    </div>
                </form>
                <div className="text-end">
                    <button onClick={() => onSubmit(SamountData)} className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                </div>
            </div>
        </div>
    );
};


export default AmountForm;