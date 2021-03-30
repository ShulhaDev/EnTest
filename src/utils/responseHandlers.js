import {info} from "../components/Common/EventSponge/EventSponge";

export const handleResponse = (dataObject, dispatch, creator, successMsg, payload = dataObject.data) => {
    if (dataObject.message === "ok") {
        dispatch(creator(payload));
        if (successMsg)
            info(successMsg);
    } else
        info(dataObject.error);
    return dataObject;
}


export const simpleRequestHandler = async (request,dispatch,creator,successMsg,errorHandler) => {
    let response;
    try {
        response = await request;
    }
    catch(err){
        if(errorHandler)
            errorHandler(err);
        else
            info((err + '').split(' at')[0]);
        return {error: err};
    }
    // if dispatch is undefined, creator is used as callback function with dataObject as a parameter
    // for example: (data) => dispatch(someCreator( data.someProp, data.anotherProp ...)
    if(dispatch)
        return handleResponse(response.data, dispatch, creator, successMsg);
    else
        creator(response.data);

    return response.data;
}