const chatModel = require('../models/chat')

/**
 * Retrieves the user ID associated with the given chat ID.
 *
 * @param {string} chatId - The ID of the chat.
 * @return {Promise} A Promise that resolves to the user ID.
 */
const getUserID = async (msg, chatId) => {
    try {

        const doc = {
            id: chatId,
            username: msg.from.username,
            first_name: msg.from.first_name,
            language_code: msg.from.language_code,
            usage: 0,
            subscribed: false
        }

        const existingDoc = await chatModel.findOne({ id: chatId });

        if (!existingDoc) {
            const result = await chatModel.create(doc)
            console.log(`A document was inserted with the _id: ${result.id}`)
        } else {
            console.log('The chatID is already on the database')
        }
    } catch (error) {
        console.log('There was an erro trying to insert the chat Id into the database.\nError Message:', error);
    }
}

module.exports = getUserID