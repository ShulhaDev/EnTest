import {connect} from 'react-redux'
import ImageLoader from "./ImageLoader";
import {setImage} from "../../../redux/reducers/vocabulary-reducer";
import {getWordImageUrl} from "../../../redux/selectors/vocabularySelectors";

const mapStateToProps = state => {
    return {
        image: getWordImageUrl(state)
    };
}

const ImageLoaderContainer = connect(mapStateToProps,{setImage})(ImageLoader)
export default ImageLoaderContainer;