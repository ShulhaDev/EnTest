import {connect} from "react-redux";
import SearchLine from "./SearchLine";
import {
    searchLineValueChange
} from "../../redux/reducers/vocabulary-reducer";
import {getFoundList, getSearchLineValue} from "../../redux/selectors/vocabularySelectors";


const mapStateToProps = (state) => {
    return{
        searchLineValue: getSearchLineValue(state),
        foundList: getFoundList(state)
    };
}

const SearchLineContainer =  connect(mapStateToProps,{searchLineValueChange})(SearchLine)
export default SearchLineContainer;