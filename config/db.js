const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI') // using this config we can get any variables in  default.json


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        })
        console.log("MongoDB Connected...")
    } catch (err) {
        console.log(err.message)
        // Exit Process with failue
        process.exit(1)
    }
}

module.exports = connectDB