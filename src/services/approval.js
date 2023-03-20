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