import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormContext } from '../../../App';


import AmountForm from '../Form/AmountForm';
import DetailsForm from '../Form/DetailsForm';
import FormCard from '../Form/FormCard';
import Location from '../Form/Location';
import NotesFrom from '../Form/NotesFrom';
import SendingForm from '../Form/SendingForm';
import TimeForm from '../Form/TimeForm';
import '../Home/HomeComponent.css'
var CryptoJS = require("crypto-js");

const HomeComponent = () => {
    const [data, setData] = useContext(FormContext)
    const [loader, setLoader] = useState(false)
    const [formStep, setFormStep] = useState(0)
    const { handleSubmit, reset, formState: { errors }, register, } = useForm({ notes: "hello" });
    const nextFormStep = () => {
        if (formStep >= 4) {
            setLoader(false)
        } else {
            setLoader(true)
        }
        setTimeout(() => {
            console.log('Hello, World! Stop Loader')
            setLoader(false)
        }, 300)
        setFormStep((currentStep) => currentStep + 1)
    }
    const prevFormStep = () => {
        setFormStep((currentStep) => currentStep - 1)
    }

    return (
        <div>

            {
                formStep >= 0 &&
                <div>
                    <DetailsForm nextFormStep={nextFormStep} formStep={formStep} />
                </div>
            }

            {
                loader ?
                    <div className='d-flex justify-content-center mt-5 pt-5'>
                        {
                            formStep == 1 &&
                            <div className="loader"></div>
                        }
                    </div>
                    :
                    <div>
                        {
                            formStep >= 1 &&
                            <div>
                                <Location nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
                            </div>
                        }
                    </div>
            }

            {
                loader ?
                    <div className='d-flex justify-content-center mt-5 pt-5'>
                        {
                            formStep == 2 &&
                            <div className="loader"></div>
                        }
                    </div>
                    :
                    formStep >= 2 &&
                    <div>
                        <TimeForm nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
                    </div>
            }
            {
                loader ?
                    <div className='d-flex justify-content-center '>
                        {
                            formStep == 3 &&
                            <div className="loader"></div>
                        }
                    </div>
                    :
                    formStep >= 3 &&
                    <div>
                        <AmountForm nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
                    </div>
            }
            {
                loader ?
                    <div className='d-flex justify-content-center'>
                        {
                            formStep == 4 &&
                            <div className="loader"></div>
                        }
                    </div>
                    :
                    formStep >= 4 &&
                    <NotesFrom nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
            }
            {
                formStep >= 5 &&
                <SendingForm nextFormStep={nextFormStep} prevFormStep={prevFormStep} formStep={formStep} />
            }

            {
                // formStep >= 1 &&
                // <button onClick={prevFormStep}>Previous</button>
            }
            {
                // formStep <= 4 &&
                // <button onClick={nextFormStep}>Next</button>
            }

            {/* <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
                {formStep >= 0 && (
                    <DetailsForm formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 1 && (
                    <Location formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 2 && (
                    <TimeForm formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 3 && (
                    <AmountForm formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 4 && (
                    <NotesFrom formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 5 && (
                    <SendingForm formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep >= 6 || formStep >= 7 && (
                    <SendingForm formStep={formStep} nextFormStep={nextFormStep} />
                )}
            </FormCard> */}
        </div >
    );
};

export default HomeComponent;