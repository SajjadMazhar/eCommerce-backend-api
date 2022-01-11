const express = require("express");
const { verifyToken } = require("../auth/jwt_auth");
const router = express.Router();
const knex = require("../config/db")

router.post("/", verifyToken, (req, res) => {
    knex.select("*").from("shopping_cart")
        .where("cart_id", req.body.cart_id)
        .join("product", "shopping_cart.product_id", "product.product_id")
        .then(data1 => {
            knex("orders").insert({
                total_amount: data1[0].quantity * data1[0].price,
                created_on: new Date(),
                shipped_on: new Date(),
                customer_id: req.data.customer_id,
                shipping_id: req.body.shipping_id,
                tax_id: req.body.tax_id
            }).then(data2 => {
                knex("order_detail").insert({
                    order_id: data1[0].order_id,
                    product_id: data1[0].product_id,
                    attributes: data1[0].attributes,
                    product_name: data1[0].name,
                    quantity: data[0].quantity,
                    unit_cost: data[0].price
                }).then(data3 => {
                    res.send(data3)
                }).catch(err => {
                    console.log(err.message)
                    res.send("error in order_detail insertion")
                })
            }).catch(err => {
                res.send("error in order insertion")
            })
        })
})

router.get("/:order_id", verifyToken, (req, res) => {
    knex("order_detail").where({ order_id: req.body.order_id })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).send({
                "message": "Endpoint not found."
            })
        })
})

router.get("/shortDetail/:order_id", verifyToken, (req, res) => {
    knex.select("order_id", "total_amount", "created_on", "shipped_on", "status", "product.name")
        .from("orders")
        .join("product", "orders.order_id", "product.product_id")
        .where({ order_id: req.params.order_id })
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err.message)
            res.send({ status: "error" })
        })
})

router.get("/inCustomer", verifyToken, (req, res) => {
    knex("customer").where({ customer_id: req.data.customer_id })
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err.message)
            res.send("error")
        })
})

module.exports = router