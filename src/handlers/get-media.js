const { bot } = require('../bot/telegram')
const path = require('path');
const requireAll = require('require-all');
const scrapper = require('../api/scrapper');
const chatModel = require('../models/chat')
// Import handlers
const folderPath = path.join(process.cwd(), '/modules');
const modules = requireAll({ dirname: folderPath });


// Listening to the user message and return media file from social media
bot.on('message', async function (msg) {
    const chatId = msg.chat.id
    if (typeof (msg.text) === 'string' && !msg.text.startsWith('/')) {
        const link = msg.text.trim()
        const handler = Object.values(modules).find(m => link.includes(m.linkPrefix))
        if (!handler) return

        bot.sendMessage(chatId, 'Processing your link, please wait...')
            .then((msg) => {
                setTimeout(() => { bot.deleteMessage(chatId, msg.message_id) }, 5000)
            })

        try {
            const medias = await scrapper(link)

            if (handler) {
                await handler.handle(bot, chatId, medias)
                console.log('\x1b[1;34m〉 URL: \x1b[1;36m' + link + ' \x1b[1;37m');

                const existingDoc = await chatModel.findOne({ id: chatId });

                await chatModel.updateOne({ id: chatId }, {
                    $inc: { usage: 1 },
                    $set: { language_code: msg.from.language_code }
                });

                if (existingDoc.usage >= 3 && existingDoc.usage % 3 === 0) {
                    const options = {
                        parse_mode: 'Markdown',
                        disable_web_page_preview: true,
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                    text: 'Donate',
                                    url: process.env.BASE_URL + 'donate'
                                }]
                            ]
                        }
                    }

                    bot.sendMessage(chatId, '🌟 We need your support! Every donation helps us cover server and software costs to keep our bot running. Thank you! 🙏💖', options)
                }
            }
        } catch (error) {
            console.log(error);
            bot.sendMessage(chatId, 'There was an error processing your link, please try again', { parse_mode: 'Markdown' })
        }
    }
})