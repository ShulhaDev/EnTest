import {connect} from "react-redux";
import RegistrationPage from "./RegistrationPage";
import {
     registerUser
} from "../../redux/reducers/user-reducer";


const RegistrationPageContainer = connect(null,{registerUser})(RegistrationPage);

export default RegistrationPageContainer;