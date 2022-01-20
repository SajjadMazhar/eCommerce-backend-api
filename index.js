const express = require("express")
const app = express();
require("dotenv").config()
const departmentRoute = require("./routes/departments")
const categorieRoute = require("./routes/categories");
const attributeRoute = require("./routes/attributes");
const productRoute = require("./routes/products");
const customerRoute = require("./routes/customers");
const orderRoute = require("./routes/orders");
const shoppingKartRoute = require("./routes/shoppingKart")
const taxRoute = require("./routes/taxes");
const shippingRoute = require("./routes/shipping");
const stripeRoute = require("./routes/stripe")
const passport= require("passport")
const passportSetup = require("./config/passport-setup")
const cookieSession = require("cookie-session")

const port = process.env.PORT || 4545

app.use(express.json())

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


// All routes here
app.use("/departments", departmentRoute);
app.use("/categories", categorieRoute);
app.use("/attributes", attributeRoute);
app.use("/products", productRoute);
app.use("/customer", customerRoute);
app.use("/orders", orderRoute);
app.use("/shoppingkart", shoppingKartRoute);
app.use("/tax", taxRoute);
app.use("/shipping", shippingRoute);
app.use("/stripe", stripeRoute);


app.listen(port, ()=>{
    console.log("server listening at port:", port)
})