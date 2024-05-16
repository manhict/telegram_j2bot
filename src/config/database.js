const mongoose = require('mongoose')

const MONGO_URI = process.env.DATABASE_URL;

(async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            autoIndex: true,
        });
        console.log((`\x1b[1;34m〉Success: \x1b[1;32mMongoDB Connected: \x1b[1;36m${conn.connection.host}:${conn.connection.port} - \x1b[1;35m[${conn.connection.name}]\x1b[1;37m`));
    } catch (err) {
        console.error((`\x1b[1;31m〉Mongosee Error: ${err.message}`));
    }
})()