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
const port = process.env.PORT || 4545

app.use(express.json())
app.use("/categories", categorieRoute);
app.use("/attributes", attributeRoute);

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