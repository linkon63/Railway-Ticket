import React, { useContext } from 'react';
import { FormContext } from '../../../App';
import { useForm } from "react-hook-form";

const NotesFrom = ({ formStep, nextFormStep }) => {
    var CryptoJS = require("crypto-js");
    const [data, setData] = useContext(FormContext)
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: "all" });

    const onSubmit = (values) => {
        try {
            console.log("Value:", values)
            const notes = values.notes
            const eNotes = CryptoJS.AES.encrypt(notes, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kNotes = (key[0])
            localStorage.setItem(`${kNotes}`, `${eNotes}`)
            setData({ ...data, values })
            nextFormStep();

        } catch (error) {
            console.log("step 2", error)
        }
    };
    return (
        <div className={formStep === 4 ? "showForm" : "hideForm"}>
            <div className="p-5">
                <h4>Notes Form</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="textarea">Notes</label> <br />
                        <textarea
                            type="text"
                            id="textarea"
                            className='w-100'
                            rows="8" cols="80"
                            {...register("notes", {
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


export default NotesFrom;