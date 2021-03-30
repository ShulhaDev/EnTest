import {connect} from "react-redux"
import EventSponge from "./EventSponge";
import {close} from "../../../redux/reducers/notification-reducer";
import {getMessageData} from "../../../redux/selectors/messageSelectors";

const mapStateToProps = (state) => {
    return {
        messageData: getMessageData(state)
    };
}


const EventSpongeContainer = connect(mapStateToProps,{close})(EventSponge)

export default EventSpongeContainer;