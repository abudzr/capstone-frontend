import callAPI from "utils/fetcher";

export const serviceUsers = async (props) => {
    const url = `/v1/api/users`;

    return callAPI({
        url,
        method: 'GET',
        token: props?.token,
    });
};

export const serviceRoles = async (props) => {
    const url = `/v1/api/users/roles`;

    return callAPI({
        url,
        method: 'GET',
        token: props?.token,
    });
};

export const serviceAddRole = async (props) => {
    const url = `/v1/api/users/roles`;
    console.log(props);
    return callAPI({
        url,
        method: 'POST',
        token: props?.token,
        data: {
            useruuid: props?.data.useruuid,
            roleuuid: props?.data.roleuuid
        }
    });
};

export const serviceDepartments = async (props) => {
    const url = `/v1/api/users/departments`;

    return callAPI({
        url,
        method: 'GET',
        token: props?.token,
    });
};

export const serviceAddDepartment = async (props) => {
    const url = `/v1/api/users/departments`;
    console.log(props);
    return callAPI({
        url,
        method: 'POST',
        token: props?.token,
        data: {
            useruuid: props?.data.useruuid,
            departmentuuid: props?.data.departmentuuid,
        }
    });
};

export const serviceAddUser = async (props) => {
    const url = `/v1/api/users`;

    return callAPI({
        url,
        method: 'POST',
        token: props?.token,
        data: {
            username: props.data.username,
            email: props.data.email,
            password: props.data.password,
            active: true,
            createdby: "system",
            lastupdatedby: "system"
        }
    });
};