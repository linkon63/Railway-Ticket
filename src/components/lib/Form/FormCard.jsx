import React from 'react';
const FormCard = ({ children, currentStep, prevFormStep }) => {
    return (
        <div className='pt-5'>
            <div className="ms-5">
                {currentStep <= 7 && (
                    <>
                        {currentStep > 0 && (
                            <button
                                className='btn btn-secondary'
                                onClick={prevFormStep}
                                type="button"
                            >
                                Previous
                            </button>
                        )}
                    </>
                )}
                <span className='text-center ms-4'>
                    Step {currentStep + 1} of 6
                </span>
            </div>
            {children}
        </div>
    );
};

export default FormCard;