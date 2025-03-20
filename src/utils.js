import axios from "axios";

export const interceptorsAxios = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = window.localStorage.getItem("auth");
            if (token) {
                return {
                    ...config,
                    headers: {
                        ...(token !== null && { Authorization: `Bearer ${token}` }),
                        ...config.headers,
                    },
                };
            }
        },
        (errors) => {
            return Promise.reject(errors);
        }
    );
}
