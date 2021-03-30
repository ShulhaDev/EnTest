import React from 'react'

const WordDataField = ({onChange, id,value}) => {
    return (
        <React.Fragment>
            <legend style={{marginTop: "15px"}}>{id}:</legend>
            <input key={id} type="text" className= {`wordData ${id}`} id={id} value={value} onChange = {onChange}/>
        </React.Fragment>
    );
}

export default React.memo(WordDataField);