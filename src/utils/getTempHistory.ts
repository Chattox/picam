import axios from 'axios';

export const getTempHistory = async () => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Methods': 'GET',
    },
    method: 'get',
    url: process.env.REACT_APP_TEMP_HISTORY_URL,
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
