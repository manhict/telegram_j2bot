var axios = require('axios');

var configData = {
    baseURL: process.env.NODE_ENV === 'production'
        ? process.env.API_URL : process.env.API_URL,
    headers: {
        "content-type": "application/json",
        "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJxxx",
        "apikey": process.env.APIKEY
    },
};

module.exports = axios.create(configData);