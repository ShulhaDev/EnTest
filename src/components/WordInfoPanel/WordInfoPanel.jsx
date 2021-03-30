import React from 'react'
import PinnedImage from "../Common/PinnedImage";
import InfoLabel from "../Common/InfoLabel/InfoLabel";

const WordInfoPanel = (props) => {
    const {word,translation,transcription,image} = props.data;
    return(
        <div style={{display: "grid", gridTemplateColumns: "1fr"}}>
            <PinnedImage src={image || ''} />
            <InfoLabel sourceType={"word"}>{word || ''}</InfoLabel>
            <InfoLabel sourceType={"transcription"}>{transcription || ''}</InfoLabel>
            <InfoLabel sourceType={"translation"}>{translation || ''}</InfoLabel>
        </div>
    );
}

export default WordInfoPanel;