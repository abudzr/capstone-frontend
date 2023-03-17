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

export const serviceInfoUser = async (props) => {
    let params = {};

    if (props?.username) {
        params.username =  props?.username;
    }

    if (props?.email) {
    params.email = props?.email
    }
    const url = 'v1/api/users';

    return callAPI({
        url,
        method: 'GET',
        token: props?.token,
        params,
    });
};
