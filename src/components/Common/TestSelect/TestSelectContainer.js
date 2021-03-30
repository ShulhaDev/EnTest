import TestSelect from "./TestSelect";
import {connect} from "react-redux";
import {testNameChanged} from "../../../redux/reducers/vocabulary-reducer";
import {getTestData, getTests} from "../../../redux/selectors/testSelectors";

const mapStateToProps = (state) => {
    return {
        testData: getTestData(state),
        tests: getTests(state)
    };
}



const TestSelectContainer = connect(mapStateToProps,{testNameChanged})(TestSelect)

export default TestSelectContainer;