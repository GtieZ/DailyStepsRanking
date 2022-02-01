import general from './general';

const token = general.token;

const axiosConfig = {
    headers: {
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
    params: { limit: 1000 },
  };

  export default axiosConfig;