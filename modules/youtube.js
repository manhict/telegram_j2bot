const axios = require('axios')
const { errHandler, linkError, mediaError } = require('../src/error/error-handler')
/**
 * Scrapes YouTube media from the given bot and chat ID.
 *
 * @param {Object} bot - The bot object used to send messages.
 * @param {number} chatId - The ID of the chat where the message will be sent.
 * @param {Array} medias - An array of media objects to process.
 * @return {Promise} A Promise that resolves when the scraping is complete.
 */
const youtubeScrapper = async (bot, chatId, medias) => {
    try {
        const sortedMedias = medias.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));

        if (medias.length > 0) {
            if (sortedMedias[0].extension === 'mp4') {
                const slink = process.env.API_URL_SHORTLINK + sortedMedias[0].url;
                const config = {
                    url: slink,
                    method: 'POST',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                    data: {
                        url: sortedMedias[0].url
                    }
                }
                let shorturl;
                try {
                    const data = await axios.request(config)
                    shorturl = data.data.url;
                } catch (error) {
                    return linkError(bot, chatId)
                }

                return bot.sendVideo(chatId, process.env.API_URL_DOWNLOAD + shorturl)
            } else {
                return linkError(bot, chatId)
            }
        } else {
            return mediaError(bot, chatId)
        }
    } catch (error) {
        console.log(error);
        return errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'youtu',
    handle: youtubeScrapper
}