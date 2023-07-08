const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const connectDB = require("./config/dbConnect");

const PORT = process.env.PORT || 3500;
const app = express();

// connect to mongo
connectDB();
app.use("/public",express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.get("/payment/getkey",(req,res)=>{
    res.status(200).json({key : process.env.KEY_ID})
})
// apis
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/todo",require("./routes/todo"));
app.use("/forgotpw",require("./routes/passwordReset"));
app.use("/payment",require("./routes/razorpay"));

mongoose.connection.once("open", () => {
    console.log("connected db");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
