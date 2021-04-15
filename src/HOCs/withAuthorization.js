import React from 'react'
import {connect} from "react-redux";
import {getLoggedUser} from "../redux/selectors/userSelectors";
import LoginPageContainer from "../components/LoginPage/LoginPageContainer";

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
      return <LoginPageContainer nextPage={props.nextPage}/>
      // return <Redirect to={"/loginPage"}/>
  }
}

Container = connect(mapStateToProps,null)(Container);

 const withAuthorization = (nextPage='') => WrappedComponent => {
    return () => <Container nextPage={nextPage} wrappedComponent ={WrappedComponent} />
}
export default withAuthorization