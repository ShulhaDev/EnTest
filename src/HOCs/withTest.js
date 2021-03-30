import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getFromTestSelect} from "../redux/selectors/testSelectors";

const mapStateToProps = (state,ownProps) => {
    return {
        testChosen: getFromTestSelect(state) ,
        Component: ownProps.wrappedComponent
    }
}

let Container = props => {
    let CustomComponent = props.Component;
    if(props.testChosen)
        return <CustomComponent />
    else{
        return <Redirect to={"/testSelectPage"}/>
    }
}

Container = connect(mapStateToProps,null)(Container);

const withTestData = WrappedComponent => {
    return () => <Container wrappedComponent ={WrappedComponent} />
}
export default withTestData;