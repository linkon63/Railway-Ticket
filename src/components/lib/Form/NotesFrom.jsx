import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../../App';
import { useForm } from "react-hook-form";
var CryptoJS = require("crypto-js");
const NotesFrom = ({ nextFormStep, prevFormStep, formStep }) => {

    const { handleSubmit, reset, formState: { errors }, register, } = useForm({
        defaultValues: {
            notes:
                `
        "
,'"" ./\=?!:;
"",""a"",""b""
ヲンヰヱヴーヾ・
ｧｰｭｿﾏﾞﾟ
㌶Ⅲ⑳㏾☎㈱髙﨑
¢£¬‖−〜―
<script>alert('Bug!!!');</script>
&lt;&copy;&amp;
జ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞా
జ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞాజ్ఞా
§¦ЙЁКД§∪§¦ЙЁКД§
t҉̠̩̰͔͇͔͓̤͕̪̱̗̖̳̭͒̊̓̆̂͌̐̿̎̈́͂̓̇̆e҉͉̤̣̤͕̙̖͓͍͇̤͔͎̦̗̣͎͓̖̫͂̌̿͂͐̈̽̋͛̈̀̂́̂̐̽̂̓̇̆̅͗ͅx҉̰̤̰͉͕̪̙͖̭̜̪͎̮̗̞͇̞̫̬̝̲͈̔́̔͋̿̆̒̋͗͋̀͌͋̈́͂̃̒ͅt̸͚͖͙̮̘̥̯̞͈̲͚̱͚́͒̐̾̋͋̔̓̉̋̈́̉͗̌͑́͌̉̀͂̂͂̌"							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
	





        `
        }
    });
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const localStorageData = { ...localStorage }
        const { notes } = localStorageData

        const dNotesByte = notes ? CryptoJS.AES.decrypt(notes, 'my-secret-key@123') : ""
        const dNotes = (dNotesByte.toString(CryptoJS.enc.Utf8))

        setFormData({ notes: dNotes })
        console.log("Step-5")

    }, [formStep])

    useEffect(() => {
        const notes = localStorage.getItem("notes")
        notes ?
            reset(formData)
            :
            console.log("notes no in local storage")
    }, [formData])


    const onSubmit = (values) => {
        try {
            const notes = values.notes
            const eNotes = CryptoJS.AES.encrypt(notes, 'my-secret-key@123').toString()
            const key = Object.keys(values)
            const kNotes = (key[0])
            localStorage.setItem(`${kNotes}`, `${eNotes}`)
            console.log("Value:", values)
            reset(values)
            nextFormStep();

        } catch (error) {
            console.log("step 5", error)
        }
    };

    return (
        <div className='pe-5 ps-5'>
            <div className={formStep == 4 ? "showForm" : "hideForm"}>
                <h6>Step 5 : Notes</h6>
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
                        <div className="d-flex justify-content-between">
                            <button className='btn btn-secondary btn-sm text-center' onClick={prevFormStep}>Previous</button>
                            <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotesFrom;

// const NotesFrom = ({ formStep, nextFormStep }) => {
//     var CryptoJS = require("crypto-js");
//     const [data, setData] = useContext(FormContext)
//     const {
//         handleSubmit,
//         formState: { errors },
//         register,
//     } = useForm({ mode: "all" });

//     const onSubmit = (values) => {
//         try {
//             console.log("Value:", values)
//             const notes = values.notes
//             const eNotes = CryptoJS.AES.encrypt(notes, 'my-secret-key@123').toString()
//             const key = Object.keys(values)
//             const kNotes = (key[0])
//             localStorage.setItem(`${kNotes}`, `${eNotes}`)
//             setData({ ...data, values })
//             nextFormStep();

//         } catch (error) {
//             console.log("step 2", error)
//         }
//     };
//     return (
//         <div className={formStep === 4 ? "showForm" : "hideForm"}>
//             <div className="p-5">
//                 <h4>Notes Form</h4>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <label htmlFor="textarea">Notes</label> <br />
//                         <textarea
//                             type="text"
//                             id="textarea"
//                             className='w-100'
//                             rows="8" cols="80"
//                             {...register("notes", {
//                                 required: true,
//                             })}
//                         />
//                         <br /> <br />
//                         <div className="text-end">
//                             <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };


// export default NotesFrom;