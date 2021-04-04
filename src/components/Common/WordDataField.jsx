import React from 'react'

const WordDataField = ({onChange, id,value}) => {
    return (
        <React.Fragment>
            <legend >{id}:</legend>
            <input key={id} type="text" className= {`wordData ${id}`} id={id} value={value} onChange = {onChange}/>
        </React.Fragment>
    );
}

export default React.memo(WordDataField);