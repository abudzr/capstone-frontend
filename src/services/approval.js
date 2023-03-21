import callAPI from "utils/fetcher";

const CURRENT_API = "approvals";

export const addApproval = async (data) => {
    
    const url = `api/v1/${CURRENT_API}`;

    return callAPI({
        url,
        method: 'POST',
        data,
        token :true
    });
};

export const listApprovalService = async (props) => {
    let params = {};
    if (props?.departmentuuid) {
        params.departmentuuid =  props?.departmentuuid;
    }

    const url = `api/v1/${CURRENT_API}`;

    return callAPI({
        url,
        method: 'GET',
        params,
        token :true
    });
};
