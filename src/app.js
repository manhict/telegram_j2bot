process.env.NTBA_FIX_319 = 1
require('./config/database')
require('./bot/telegram')
require('./handlers/bot-commands')
require('./handlers/get-userId')
require('./handlers/get-media')

console.log('-- Bot is alive! --')