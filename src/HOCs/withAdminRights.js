import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAdmin} from "../redux/selectors/userSelectors";

const mapStateToProps = (state,ownProps) => {
    return {
        isAdmin: getIsAdmin(state),
        Component: ownProps.wrappedComponent
    }
}

let Container = props => {
    let CustomComponent = props.wrappedComponent;
    if(props.isAdmin)
        return <CustomComponent />
    else
        return <Redirect to={"/menuPage"}/>
}

Container = connect(mapStateToProps,null)(Container);

const withAdminRights = WrappedComponent => {
    return () => <Container wrappedComponent ={WrappedComponent} />
}
export default withAdminRights