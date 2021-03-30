import {connect} from "react-redux";
import TestSelectPage from "./TestSelectPage";
import {setFromTestSelect} from "../../redux/reducers/vocabulary-reducer";
import withAuthorization from "../../HOCs/withAuthorization";
import {compose} from "redux";

const TestSelectPageContainer = compose(
    withAuthorization,
    connect(null,{setFromTestSelect})
)(TestSelectPage)
export default TestSelectPageContainer;