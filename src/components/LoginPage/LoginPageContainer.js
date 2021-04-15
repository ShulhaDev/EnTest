import {logout, login} from "../../redux/reducers/user-reducer";
import {connect} from "react-redux";
import LoginPage from "./LoginPage";
import {clearTests} from "../../redux/reducers/vocabulary-reducer";
import {getLoggedUser} from "../../redux/selectors/userSelectors";


let mapStateToProps = (state,ownProps) => {
    return {
        loggedIn: getLoggedUser(state),
        nextPage: ownProps.nextPage
    };
}

const LoginPageContainer = connect(mapStateToProps, {
    login,logout,clearTests
})(LoginPage);

export default LoginPageContainer;