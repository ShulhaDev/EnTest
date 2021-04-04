import React from 'react'
import styles from './ValidatedField.module.scss'
import {Field} from "redux-form";
import {maxLength15, minLength2, valueRequired} from "../../../utils/validators";

const ValidatedField = ({input,meta,inputName='input',...props}) => {
    const CustomTag = inputName;
    let fail = meta.touched && meta.error;
    return (
        <div className={(fail || undefined) && styles.error}>
            <span>{fail && " ! "}</span>
            <CustomTag {...input} {...props} title={fail || ''}/>
        </div>
    );
};
export const TextField = ({name,type ,placeHolder,legend, ...props}) => {
    return (
        <>
            <legend className={"highlighted"}>{legend}</legend>
            <Field name = {name}
                   validate={[valueRequired,maxLength15,minLength2]}
                   component={ValidatedInput}
                   placeholder={placeHolder}
                   type={type}
                   {...props}
            />
        </>
    );
};

export const ValidatedInput = (props) => <ValidatedField inputName="input" {...props}/>

export default ValidatedField;