import callAPI from "utils/fetcher";

const CURRENT_API = "requests";

export const serviceListRequest = async (props) => {
    let params = {};
    if (props?.departmentid) {
        params.departmentid =  props?.departmentid;
    }
    
    const url = `v1/api/${CURRENT_API}`;

    return callAPI({
        url,
        method: 'GET',
        params,
        token :true
    });
};

export const addRequest = async (data) => {
    
    const url = `v1/api/${CURRENT_API}`;

    return callAPI({
        url,
        method: 'POST',
        data,
        token :true
    });
};