import {connect} from 'react-redux'
import TestPage from "./TestPage";
import {getCurrentTest, getCurrentTestSet} from "../../redux/selectors/testSelectors";
import {getFoundList} from "../../redux/selectors/vocabularySelectors";
import withTestData from "../../HOCs/withTest";
import withAuthorization from "../../HOCs/withAuthorization";
import {compose} from "redux";
import {setFromTestSelect} from "../../redux/reducers/vocabulary-reducer";

const mapStateToProps = (state) =>{
    let test = getCurrentTest(state);
    let name = test && test.name;
    return{
        testName: name || 'all',
        test_ids: getCurrentTestSet(state),
        words: getFoundList(state) || []
    };
}

const TestPageContainer = compose(
    withTestData,
    withAuthorization,
    connect(mapStateToProps,{setFromTestSelect})
)(TestPage)
export default  TestPageContainer;