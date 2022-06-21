import React, { useContext, useState } from 'react';
import { FormContext } from '../../../App';
import AmountForm from '../Form/AmountForm';
import DetailsForm from '../Form/DetailsForm';
import FormCard from '../Form/FormCard';
import Location from '../Form/Location';
import NotesFrom from '../Form/NotesFrom';
import SendingForm from '../Form/SendingForm';
import TimeForm from '../Form/TimeForm';

const HomeComponent = () => {
    const [data, setData] = useContext(FormContext)
    const [formStep, setFormStep] = useState(0)
    const nextFormStep = () => {
        setFormStep((currentStep) => currentStep + 1)
    }
    const prevFormStep = () => {
        setFormStep((currentStep) => currentStep - 1)
    }

    return (
        <div>
            <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
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
            </FormCard>
        </div>
    );
};

export default HomeComponent;