require("./Config/db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const user = require("./Routes/userRoute");
const stock = require("./Routes/stockRoute");
const refer = require("./Routes/referralRoutes");
const login = require("./Routes/loginRoute");
const order = require("./Routes/orderRoutes");

app.use("/api/v1/user", user);
app.use("/api/v1/stock", stock);
app.use("/api/v1/referral", refer);
app.use("/api/v1/auth", login);
app.use("api/v1/order",order)

app.get('/', (req,res) => {
    res.send('Welcome to the Agoi Server');
});

module.exports = app;
