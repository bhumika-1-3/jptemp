const mongoose = require("mongoose")
require("dotenv").config();


const dbconnect = async () => {

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    }
    catch (e) { 
        console.log(e);
    }
}

module.exports = dbconnect