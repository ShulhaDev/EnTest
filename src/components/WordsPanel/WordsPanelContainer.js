import WordsPanel from "./WordsPanel";
import {connect} from "react-redux";
import {
    confirmTestSet, searchLineValueChange,
    selectAllFound, throwAllFound
} from "../../redux/reducers/vocabulary-reducer";
import {getFilteredList, getSelectedForTest, getWordData} from "../../redux/selectors/vocabularySelectors";

const mapStateToProps = (state,ownProps) => {
    return {
        foundList: getFilteredList(state),
        wordData: getWordData(state),
        selectedForTest:  getSelectedForTest(state),
        multiselect: ownProps.multiselect
    };
}

const WordsPanelContainer = connect(mapStateToProps,{
    searchLineValueChange,selectAllFound,throwAllFound,confirmTestSet
})(WordsPanel)

export default WordsPanelContainer;