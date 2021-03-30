
const valueRequired = value => {
    if(!value)
        return  'Field value is required!';
    else
        return undefined;
}

const maxLength = len => value => {
    if(value && value.length > len)
        return "Field value is too long (max " + len + " characters)!";
    else
        return undefined;
}
const minLength = len => value => {
    if(value && value.length < len)
        return "Field value is too short (min " + len + " characters)!";
    else
        return undefined;
}
export {valueRequired,maxLength,minLength}
export const maxLength15 = maxLength(15);
export const minLength2 = minLength(2);

const validator = {
    valueRequired,
    maxLength,
    minLength
}

export default validator;