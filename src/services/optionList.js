import callAPI from "utils/fetcher";

const CURRENT_API = "requesttypes";

export const listServicetype = async () => {
    const url = `v1/api/${CURRENT_API}`;

    return callAPI({
        url,
        method: 'GET',
        token: true,
    });
};

export const listServicetypeByUuid = async (props) => {
    const url = `v1/api/${CURRENT_API}/${props}`;

    return callAPI({
        url,
        method: 'GET',
        token: true,
    });
};

export const listOptionItem = async (props) => {
    const url = `/api/v1/items`;

    return callAPI({
        url,
        method: 'GET',
        token: true,
    });
};
export const listOptionService = async (props) => {
    const url = `/api/v1/services`;

    return callAPI({
        url,
        method: 'GET',
        token: true,
    });
};

