import Row from "../Common/Row/Row";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import {reduxForm} from "redux-form";
import {Redirect, useHistory} from "react-router-dom";
import {TextField} from "../Common/ValidatedField/ValidatedField";
import {maxLength15, valueRequired} from "../../utils/validators";
import React from "react";
import ErrorLegend from "../Common/ErrorLegend";

const loginField = <TextField name='login' type='text' placeHolder='login' legend='Login'  validate={[valueRequired,maxLength15]}/>;
const passwordField =  <TextField name='password' type='password' placeHolder='password' legend='Password' validate={[valueRequired,maxLength15]}/>;

let LoginForm = (props) => {
    let history = useHistory();
    if(props.submitSucceeded)
        return <Redirect to ="/menuPage"/>
    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset>
                <ErrorLegend title={props.error}>{props.error && 'Incorrect'}</ErrorLegend>
                {loginField}
                {passwordField}
                <br/>
                <Row>
                    <SpongeBtn type="submit" disabled={props.submitting || props.pristine || !props.valid}>Login</SpongeBtn>
                    <SpongeBtn onClick={() => history.push("/registrationPage")}>Registration</SpongeBtn>
                </Row>
            </fieldset>
        </form>
    );
}

LoginForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

export default LoginForm;