import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

var CryptoJS = require("crypto-js");

const NotesFrom = () => {
    const navigate = useNavigate()
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
    const [showForm, setShowForm] = useState('hideForm')
    useEffect(() => {
        setTimeout(() => { setShowForm('showForm') }, 700)
        console.log("Step-5")
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
              // Decrypt
              var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
              var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
              if (decryptedData.notes) {
                reset({notes:decryptedData.notes})
              }
        }

    }, [])

    const onSubmit = (values) => {
        const localStorageData = localStorage.getItem('Enc')
        const Enc = localStorageData
        if (Enc) {
            var bytes = CryptoJS.AES.decrypt(Enc, 'secret key 123');
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))[0];
            const notes = [{ ...decryptedData, notes: values.notes }]
            var notesData = CryptoJS.AES.encrypt(JSON.stringify(notes), 'secret key 123').toString();
            localStorage.setItem("Enc", `${notesData}`)
        }
        next()
    }

    const next = () => {
        console.log("Next page")
        navigate("/step6")
    }
    const previous = () => {
        console.log("previous page")
        navigate("/step4")
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
       <p>Step 5 : Notes</p>

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
                    <button className='btn btn-secondary btn-sm text-center' onClick={previous}>Previous</button>
                    <button className='btn btn-secondary btn-sm text-center' type="submit">Next</button>
                </div>
            </div>
        </form>
       </div>
    </div>
    );
};

export default NotesFrom;