const whitelist = ["http://localhost:3500", "http://localhost:3000", "https://www.google.com", "http://127.0.0.1:5500"];


const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOption;