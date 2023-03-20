import callAPI from "utils/fetcher";

export const serviceUsers = async (props) => {
    const url = `/v1/api/users`;

    return callAPI({
        url,
        method: 'GET',
        token: props?.token,
    });
};