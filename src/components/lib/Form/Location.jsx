import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { FormContext } from '../../../App';

var CryptoJS = require("crypto-js");

const Location = ({ formStep, nextFormStep }) => {

    const [data, setData] = useContext(FormContext)
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });

    const onSubmit = (values) => {
        try {
            // console.log("Value:", values)
            const form = values.fromLocation
            const to = values.toLocation
            const eFrom = CryptoJS.AES.encrypt(form, 'my-secret-key@123').toString()
            const eTo = CryptoJS.AES.encrypt(to, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kForm = (key[0])
            const kTo = (key[1])
            localStorage.setItem(`${kForm}`, `${eFrom}`)
            localStorage.setItem(`${kTo}`, `${eTo}`)
            setData({ ...data, values })
            nextFormStep();

        } catch (error) {
            console.log("step 2", error)
        }
    };

    const getData = () => {

        // const name = localStorage.getItem('name')
        // const gender = localStorage.getItem('gender')

        // const dNameByte = CryptoJS.AES.decrypt(name, 'my-secret-key@123')
        // const dName = (dNameByte.toString(CryptoJS.enc.Utf8))
        // console.log("ename:", name)
        // console.log("dName:", dName)

        // const dGenderByte = CryptoJS.AES.decrypt(gender, 'my-secret-key@123')
        // const dGender = (dGenderByte.toString(CryptoJS.enc.Utf8))

        // console.log("egender:", gender)
        // console.log("dgender:", dGender)

    }


    return (
        <div className={formStep === 1 ? "showForm" : "hideForm"}>
            <div className="p-5">
                <h4>Location</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>Form </span>
                    <br />
                    <select {...register("fromLocation")} className="w-100">
                        <option value="dhaka">Dhaka</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="comilla">Comilla</option>
                    </select>
                    <br />
                    <br />
                    <span className='me-1'>To </span>
                    <br />
                    <select {...register("toLocation")} className="w-100">
                        <option value="chitagang">Chitagang</option>
                        <option value="kustia">Kustia</option>
                        <option value="habiganj">Habiganj</option>
                    </select>
                    <br /><br />
                    <div className='text-end'
                    // style={{ position: "absolute", top: "47%", left: "70%" }}
                    >
                        <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Location;