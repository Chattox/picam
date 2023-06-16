import axios from 'axios';

export const getTemp = async () => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET',
      'ngrok-skip-browser-warning': 'any',
    },
    method: 'get',
    url: process.env.REACT_APP_TEMPERATURE_URL,
    withCredentials: false,
  };

  return await axios(config)
    .then((res) => {
      return {
        status: res.status,
        data: res.data,
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        status: err.code,
        data: err.stack,
      };
    });
};
