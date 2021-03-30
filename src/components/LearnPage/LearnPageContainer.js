import LearnPage from "./LearnPage";
import {getLoggedUser} from "../../redux/selectors/userSelectors";
import {getWordData} from "../../redux/selectors/vocabularySelectors";
import {connect} from "react-redux";
import {compose} from "redux";
import withAuthorization from "../../HOCs/withAuthorization";

const mapStateToProps = (state)=>{
    return {
        loggedIn: getLoggedUser(state),
        data: getWordData(state)
    };
}

const LearnPageContainer = compose(
    withAuthorization,
    connect(mapStateToProps,null)
)(LearnPage);
export default LearnPageContainer