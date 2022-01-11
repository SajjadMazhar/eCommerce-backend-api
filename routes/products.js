const express = require("express");
const knex = require("../config/db")
const router = express.Router();
const {createToken, verifyToken} = require("../auth/jwt_auth")

router.get("/", (req, res)=>{
    knex.select("product_id", "name", "description", "price", "discounted_price", "thumbnail")
    .from("product").then(data=>{

        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500"
          })
    })
})

router.get("/search", (req, res)=>{
    const searchedQuery = req.query.key;
    console.log(searchedQuery)
    knex.select("product_id", "name", "description", "price", "discounted_price", "thumbnail")
    .from("product")
    .where("name", "like", "%"+searchedQuery+"%")
    .where("description", "like", "%"+searchedQuery+"%")
    .then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500"
          })
    })
})

router.get("/:product_id", (req, res)=>{
    knex("product").then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send(err.message)
    })
})

router.get("/inCategory/:category_id", (req, res)=>{
    knex.select("product.product_id", "name", "description", "price", "discounted_price", "thumbnail")
    .from("product")
    .join("product_category", "product.product_id", "product_category.product_id")
    .where("product.product_id", req.params.category_id)
    .then(data=>{
        res.send(data)
    })
})

router.get("/inDepartment/:department_id", (req, res)=>{
    knex.select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.thumbnail")
    .from("product")
    .join("product_category", "product.product_id", "product_category.product_id")
    .join("category", "product_category.category_id", "category.category_id")
    .join("department", "category.department_id", "department.department_id")
    .where("department.department_id", req.params.department_id)
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(400).send(err.message)
    })
})

router.get("/:product_id/details", (req,  res)=>{
    knex("product").where({product_id:req.params.product_id})
    .then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send(err.message)
    })
})

router.get("/:product_id/location", (req, res)=>{
    let product_id = req.params.product_id;
    knex.select('category.category_id','category.name as category_name','category.department_id','department.name as department_name').from('product')
    .join('product_category', 'product.product_id', 'product_category.product_id')
    .join('category', 'product_category.category_id', 'category.category_id')
    .join('department', 'category.department_id', 'department.department_id')
    .where('product.product_id', product_id)
    .then(data =>{
        res.send(data);
    }).catch((err) =>{
        res.status(400).send(err.message)
    })
})

router.get("/:product_id/reviews", (req, res)=>{
    knex.select("name", "review", "rating", "created_on")
    .from("review")
    .where({product_id:req.params.product_id})
    .then(data=>{
        res.send(data)
    })
})

router.post("/:product_id/reviews", createToken, (req, res)=>{
    knex("review").insert({
        product_id:req.params.product_id,
        name:req.body.name,
        review:req.body.review,
        rating:req.body.rating,
        created_on:new Date(),
        customer_id:req.data.customer_id
    }).then(()=>{
        res.send("review added")
    }).catch(err=>{
        res.send(err.message)
    })
})

module.exports = router;