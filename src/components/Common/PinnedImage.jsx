import React from "react"

const PinnedImage = (props) => {
    const pin = props.src && (<img src={"media/pin.png"} alt="dot" style={{position:"absolute", left: "50%", top: "5px", width: "15px", height: "15px"}}/>);
    return(
        <div style={{position: "relative",height: "fit-content", width: "auto", minWidth: "200px",  alignSelf: "center"}}>
            <img className = {"associatedImage"} {...props}  alt={"Not set"} />
            {pin}

        </div>
    );
};

export default PinnedImage;