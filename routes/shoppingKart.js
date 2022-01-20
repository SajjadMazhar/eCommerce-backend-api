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

router.get("/:cart_id", (req, res)=>{
    knex.select("shopping_cart.item_id", "product.name", "shopping_cart.attributes", "shopping_cart.product_id", "product.price", "shopping_cart.quantity", "product.image")
    .from("product")
    .join("shopping_cart", "product.product_id", "shopping_cart.product_id")
    .where("shopping_cart.cart_id", req.params.cart_id)
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err.message)
        res.send("error occured")
    })
})

// router.put("/update/:item_id", (req, res)=>{
//     knex("product").join("shopping_cart", "product.product_id", "shopping_cart.product_id")
//     .update({
        
//     })
// })
router.delete("/empty/:cart_id", (req, res)=>{
    knex("shopping_cart").where({cart_id:req.params.cart_id})
    .del().then(data=>{
        console.log("deleted")
        res.send(data)
    }).catch(err=>{
        console.log(err.message)
        res.send("error")
    })
})

router.get("/moveToCart/:item_id", (req, res)=>{
    knex("shopping_cart").where({item_id:req.params.item_id})
    .then(data=>{
        if(data.length>0){
            knex("cart").insert(data[0]).then(data=>{
                res.send("inserted")
            }).catch(err=>{
                console.log(err.message)
                res.send("error")
            })
        }
    }).catch(err=>{
        console.log(err.message)
        res.send("error")
    })
})

router.get("/totalAmount/:cart_id", (req, res)=>{
    knex.select("product.price", "shopping_cart.quantity")
    .where("shopping_cart.cart_id", req.params.cart_id)
    .then(data=>{
        res.send({
            "total_amount":data[0].quantity * data[0].price
        })
    }).catch(err=>{
        console.log(err.message)
        res.send("error")
    })
})

router.get("/savedForLater/:item_id", (req, res)=>{
    knex("saved").where({item_id:req.params.item_id}).then(data=>{
        knex("saved").insert(data[0]).then(data1=>{
            knex("saved").where({item_id:req.params.item_id})
            .del().then(data2=>{
                res.send("data saved")
            }).catch(err=>{
                console.log(err.message)
                res.send("error")
            })
        }).catch(err=>{
            console.log(err.message)
            res.send("error")
        })
    }).catch(err=>{
        console.log(err.message)
        res.send("error")
    })
})

router.get("/getSaved/:cart_id", (req, res)=>{
    knex("saved").where({cart_id:req.params.cart_id})
    .then(data=>{
        
    })
})

module.exports = router;

// still not finished