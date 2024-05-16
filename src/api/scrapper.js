require('dotenv').config();
const CryptoJS = require('crypto-js');
const http = require('./http-common');

const J2DOWN_SECRET = process.env.J2DOWN_SECRET
const API_SECRET = process.env.API_SECRET

function secretKey() {
    var decrypted = CryptoJS.AES.decrypt(J2DOWN_SECRET, API_SECRET);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Scrapes the provided link and returns an array of media objects.
 *
 * @param {string} link - The link to be scraped.
 * @return {Array} An array of media objects.
 */
const scrapper = async (link) => {
    const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify({ url: link, unlock: true }), secretKey()).toString();

    try {
        const response = await http.post('social/autolink', {
            data: encryptedPayload
        })

        return Object.values(response.data.medias)
    } catch (error) {
        return error;
    }
}

module.exports = scrapper