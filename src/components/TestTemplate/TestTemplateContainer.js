import TestTemplate from "./TestTemplate";
import {connect} from "react-redux";
import {
    loadActualTestSet,
    markForThrowing,
    removeTest, saveTest,
    throwSelected
} from "../../redux/reducers/vocabulary-reducer";
import {getConfirmedForTest} from "../../redux/selectors/vocabularySelectors";
import {getTestData} from "../../redux/selectors/testSelectors";
import {getLoggedUser} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => {
    return {
        words: getConfirmedForTest(state),
        testData: getTestData(state),
        user: getLoggedUser(state)
    };
}

const TestTemplateContainer = connect(mapStateToProps,{
    markForThrowing, throwSelected,saveTest,removeTest,loadActualTestSet
})(TestTemplate);

export default TestTemplateContainer;