import React from 'react'

const ErrorLegend = props => {
    return (
        <legend
            title={props.title}
            style={{
                color: "white",
                borderRadius: "5px",
                backgroundColor: "red",
                textAlign: "center"
            }}>
            {props.children}
        </legend>
    )
}
export default ErrorLegend;