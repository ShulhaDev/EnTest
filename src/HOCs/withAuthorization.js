import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getLoggedUser} from "../redux/selectors/userSelectors";

const mapStateToProps = (state,ownProps) => {
    return {
        loggedIn: getLoggedUser(state),
        Component: ownProps.wrappedComponent
    }
}

let Container = props => {
    let CustomComponent = props.wrappedComponent;
  if(props.loggedIn)
      return <CustomComponent />
  else{
      return <Redirect to={"/loginPage"}/>
  }
}

Container = connect(mapStateToProps,null)(Container);

 const withAuthorization = WrappedComponent => {
    return () => <Container wrappedComponent ={WrappedComponent} />
}
export default withAuthorization