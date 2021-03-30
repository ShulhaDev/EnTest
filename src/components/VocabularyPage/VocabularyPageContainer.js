import {connect} from "react-redux";
import VocabularyPage from "./VocabularyPage";
import {postData, removeWord, wordDataChanged} from "../../redux/reducers/vocabulary-reducer";
import {getLoggedUser} from "../../redux/selectors/userSelectors";
import {getFoundList, getTopics, getWordData} from "../../redux/selectors/vocabularySelectors";
import {compose} from "redux";
import withAdminRights from "../../HOCs/withAdminRights";
import withAuthorization from "../../HOCs/withAuthorization";

const mapStateToProps = (state) =>{
    return {
        loggedIn: getLoggedUser(state),
        wordData: getWordData(state),
        foundList: getFoundList(state),
        topicList: getTopics(state)
    };
}

const VocabularyPageContainer = compose(
    withAdminRights,
    withAuthorization,
    connect(mapStateToProps,{postData, wordDataChanged,removeWord})
)(VocabularyPage);

export default VocabularyPageContainer;