import Row from "../Common/Row/Row";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import {reduxForm} from "redux-form";
import {useHistory} from "react-router-dom";
import {TextField} from "../Common/ValidatedField/ValidatedField";
import ErrorLegend from "../Common/ErrorLegend";
import React from "react";

const loginField = <TextField name='login' type='text' placeHolder='login' legend='Login'/>;
const passwordField =  <TextField name='password' type='password' placeHolder='password' legend='Password'/>;
const cPasswordField = <TextField name='confirmPassword' type='password' placeHolder='password' legend='Confirm password'/>;

let RegistrationForm = (props) => {
    let history = useHistory();
    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset>
                <ErrorLegend title={props.error}>{props.error && 'Incorrect'}</ErrorLegend>
                {loginField}
                {passwordField}
                {cPasswordField}
                <br/>
                <Row>
                    <SpongeBtn type="submit" disabled={props.submitting || props.pristine || !props.valid}>Register</SpongeBtn>
                    <SpongeBtn onClick={() => history.push("/loginPage")}>Back</SpongeBtn>
                </Row>
            </fieldset>
        </form>
    );
}

RegistrationForm = reduxForm({
    form: 'registrationForm'
})(RegistrationForm)

export default RegistrationForm;