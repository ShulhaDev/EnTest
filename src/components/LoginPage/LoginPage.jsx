import React from 'react'
import {useHistory} from "react-router-dom";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import Row from "../Common/Row/Row";
import LoginForm from "./LoginForm";
import {SubmissionError} from "redux-form";

const LoginPage = (props) => {
    const history = useHistory();
    const tryLogin = userData => {
        if(!props.loggedIn)
            return props.login(userData).then(result => {
                if (result.errors)
                    throw new SubmissionError(result.errors)
            });
        else
            history.push(props.nextPage || './menuPage')
    }

    const changeUser = () =>{
        props.logout();
        props.clearTests();
    }

    let content;
    if(props.loggedIn){
        content = (
            <fieldset>
                <legend align="center">{props.loggedIn.name}</legend>
                <Row>
                    <SpongeBtn onClick={tryLogin}>Continue</SpongeBtn>
                    <SpongeBtn onClick={changeUser}>Not me</SpongeBtn>
                </Row>
            </fieldset>);
    }
    else
        content = <LoginForm onSubmit={tryLogin} />

    return (
        <div className="formContainer">
            <header>{props.loggedIn ? '':'Introduce yourself'}</header>
            {content}
        </div>
    );
};
export default LoginPage