const express = require("express")
const app = express();
require("dotenv").config()
const departmentRoutes = require("./routes/departments")
const categorieRoutes = require("./routes/categories");
const attributeRoute = require("./routes/attributes");
const productRoute = require("./routes/products");
const customerRoute = require("./routes/customers");
const orderRoute = require("./routes/orders");
const shoppingKartRoute = require("./routes/shoppingKart")
const taxRoute = require("./routes/taxes")
const port = process.env.PORT || 4545

app.use(express.json())

// All routes here
app.use("/departments", departmentRoutes);
app.use("/categories", categorieRoutes);
app.use("/attributes", attributeRoute);
app.use("/products", productRoute);
app.use("/customer", customerRoute);
app.use("/orders", orderRoute);
app.use("/shoppingkart", shoppingKartRoute);
app.use("/tax", taxRoute);


app.listen(port, ()=>{
    console.log("server listening at port:", port)
})