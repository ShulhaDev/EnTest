import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store.js'
import {Provider,connect} from "react-redux";
import App from "./App";
import './fonts/whatever_it_takes_bold.ttf';
import {BrowserRouter} from "react-router-dom";
import {getWords, loadTests} from "./redux/reducers/vocabulary-reducer";

const mapStateToProps = () => {
    return {
        loggedIn: store.getState().userState.loggedIn,
        gotTests: !(store.getState().vocabularyState.tests === undefined),
        gotWords: !(store.getState().vocabularyState.foundList === undefined),
        testChosen: store.getState().vocabularyState.testData !== undefined
    };
};


const AppContainer = connect(mapStateToProps,{
    getWords , loadTests
})(App)

ReactDOM.render(
    <React.StrictMode>
            <Provider store={store} >
                <BrowserRouter >
                    <AppContainer />
                </BrowserRouter>
            </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
