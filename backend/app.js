const express = require("express");
const app= express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const shop = require("./routes/shopRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",shop);
app.use("/api/v1",order);
app.use("/api/v1",payment);


module.exports = app