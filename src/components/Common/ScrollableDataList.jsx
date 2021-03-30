import React from 'react'

const ScrollableDataList = (props) => {
    return (
        <div style={{overflowY:"auto",maxHeight: "200px"}}>
            <datalist id={props.id} >
                {props.children}
            </datalist>
        </div>
    );
}

export default ScrollableDataList