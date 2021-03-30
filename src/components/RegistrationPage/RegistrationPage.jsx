import React from 'react'
import RegistrationForm from "./RegistrationForm";
import {SubmissionError} from "redux-form";

const RegistrationPage = (props) => {

    const registerUser = userData => {
        return props.registerUser(userData).then(result => {
            if (result.errors)
                throw new SubmissionError(result.errors)
        });
    }
    return (
        <div className="formContainer">
            <header>Enter your data</header>
            <RegistrationForm onSubmit={registerUser}/>
        </div>
    );
}

export default RegistrationPage;