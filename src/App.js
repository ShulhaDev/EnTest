import React,{useEffect} from "react";
import './App.scss';
import {Redirect, Route} from "react-router-dom";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";
import {Switch} from "react-router";

import RegistrationPageContainer from "./components/RegistrationPage/RegistrationPageContainer";
import MenuPageContainer from "./components/MenuPage/MenuPageContainer";
import VocabularyPageContainer from "./components/VocabularyPage/VocabularyPageContainer";
import LearnPageContainer from "./components/LearnPage/LearnPageContainer";
import TestGenerator from "./components/TestGenerator/TestGenerator";
import TestPageContainer from "./components/TestPage/TestPageContainer";
import EventSpongeContainer from "./components/Common/EventSponge/EventSpongeContainer";
import TestSelectPageContainer from "./components/TestSelectPage/TestSelectPageContainer";
import {info} from "./components/Common/EventSponge/EventSponge";

const App = ({loggedIn,gotWords,gotTests,getWords,loadTests,getCurrentUser}) => {
    useEffect(()=> {
        const manageUnhandledRejections = event => {
            //event.preventDefault();
            info(`Something went wrong... ${event.reason}`);
        }
        window.addEventListener("unhandledrejection", manageUnhandledRejections);
        return () => window.removeEventListener ('unhandledrejection',manageUnhandledRejections)
    },[])
    useEffect (()=>{
        getCurrentUser();
    },[getCurrentUser])
    useEffect(()=>{
        if(!gotWords) {
            getWords();
        }
    },[gotWords,getWords]);

    useEffect(()=>{
        if(!gotTests && loggedIn)
            loadTests(loggedIn);
    },[gotTests,loadTests,loggedIn]);

    const login = () => <LoginPageContainer/>;
    const registration = () => <RegistrationPageContainer />;
    const menu =  () => <MenuPageContainer />;
    const vocabulary = () =>  <VocabularyPageContainer />;
    const learnPage = () => <LearnPageContainer />
    const testSelect = () => <TestSelectPageContainer />;
    const test = () => <TestPageContainer />;
    const testGenerator = () => <TestGenerator />;

    return (
        <div className="background">
            <EventSpongeContainer />
            <Switch>
                <Route path="/loginPage" component={login}/>
                <Route path="/registrationPage" component={registration}/>
                <Route path="/menuPage" component={menu}/>
                <Route path ="/learnPage" component ={learnPage} />
                <Route path ="/vocabulary" component ={vocabulary} />
                <Route path ="/testSelectPage" component ={testSelect} />
                <Route path ="/testPage" component ={test} />
                <Route path ="/testGenerator" component ={testGenerator} />
                <Redirect to="/menuPage" />
            </Switch>

        </div>
    );
}

export default App;
