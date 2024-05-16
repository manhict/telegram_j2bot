var axios = require('axios');

var configData = {
    baseURL: process.env.NODE_ENV === 'production'
        ? process.env.API_URL : process.env.DEV_URL,
    headers: {
        "content-type": "application/json",
        "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJxxx"
    },
};

module.exports = axios.create(configData);