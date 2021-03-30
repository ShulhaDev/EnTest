import {connect}  from "react-redux"
import MenuPage from "./MenuPage";
import {getLoggedUser} from "../../redux/selectors/userSelectors";
import withAuthorization from "../../HOCs/withAuthorization";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        user: getLoggedUser(state)
    }
}
const MenuPageContainer = compose(
    withAuthorization,
    connect(mapStateToProps,null)
    )(MenuPage);
export default  MenuPageContainer;