import callAPI from "utils/fetcher";

const CURRENT_API = "auth";

export const serviceLogin = async ({ username, password }) => {
    const url = `api/v1/${CURRENT_API}/login`;

    return callAPI({
        url,
        method: 'POST',
        data: {
            username,
            password,
        },
    });
};