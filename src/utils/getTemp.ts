import axios from 'axios';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
  method: 'get',
  url: process.env.REACT_APP_TEMPERATURE_URL,
};

export const getTemp = async () => {
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
