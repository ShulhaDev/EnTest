import TopicSelect from "./TopicSelect";
import {connect} from "react-redux";
import {fetchTopics,wordDataChanged} from "../../../redux/reducers/vocabulary-reducer";
import {getTopics, getTopicValue} from "../../../redux/selectors/vocabularySelectors";

const mapStateToProps = (state,ownProps) => {
    return {
        topicValue: getTopicValue(state,ownProps.isSelector),
        topicList: getTopics(state),
        isSelector: ownProps.isSelector
    };
}

const TopicSelectContainer = connect(mapStateToProps,{
    wordDataChanged,fetchTopics
})(TopicSelect);

export default  TopicSelectContainer;