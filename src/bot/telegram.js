const node_telegram_bot = require('node-telegram-bot-api');

// Telegram API
const token = process.env.TELEGRAM_API

// Declaring the bot
const bot = new node_telegram_bot(token, {
    polling: true, request: {
        agentOptions: {
            keepAlive: true,
            family: 4
        }
    }
});

// Exporting the bot instance
module.exports = {
    bot
}