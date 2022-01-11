const express = require("express")
const random = require("randomstring")
const router = express.Router()
const knex = require("../config/db")

router.get("/generatedUniqueId", (req, res)=>{
    const card_id = random.generate({charset:"alphanumeric"})
    res.send({card_id})
})

router.post("/add", (req, res)=>{
    knex.select("quantity").from("shopping_cart")
    .where({cart_id:req.body.card_id})
    .andWhere({product_id:req.body.product_id})
    .andWhere({attributes:req.body.attributes})
    .then(data=>{
        if(data.length > 0){
            res.send("data is there already")
        }else{
            knex("shopping_cart").insert({
                cart_id:req.body.card_id,
                product_id:req.body.product_id,
                attributes:req.body.attributes,

            })
        }
    })
})

module.exports = router;

// still not finished