export const areEqual = (prevProps, nextProps) => prevProps === nextProps

export const leavesEqual = (prevProps, nextProps) => {
    let decision = true;
    if (typeof prevProps === 'object' && prevProps !== null) {
        const subPropsFromPrev = Object.entries(prevProps);
        const subPropsFromNext = Object.entries(nextProps);
        decision &=
            subPropsFromNext.length === subPropsFromPrev.length
         && subPropsFromPrev.reduce(
            (result, [key, value], i) => {
                if(!nextProps.hasOwnProperty(key))
                    return false;
                return result && leavesEqual(value, nextProps[key]);
            }, true);
    } else
        decision &= prevProps === nextProps;
    return decision;
}

// console.log(leavesEqual({
//     a: 1,
//     b: [1,2],
//     c: {
//         ca: "1",
//         cb: "2"
//     },
//     d: undefined
// },{
//     a: 1,
//     c: {
//         ca: "1",
//         cb: "2",
//     },
//     b: [1,2],
//     d: undefined
// }))
