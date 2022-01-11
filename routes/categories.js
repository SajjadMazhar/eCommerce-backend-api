const express = require("express");
const knex = require("../config/db")
const router = express.Router();

router.get("/", (req, res)=>{
    knex("category").then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500",
            "error":err.message
          })
    })
})

router.get("/:category_id", (req, res)=>{
    knex("category").where({category_id:req.params.category_id})
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

router.get("/inProduct/:product_id", (req, res)=>{
    knex("product_category").where({product_id:req.params.product_id})
    .then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500",
            "error":err.message
            })
    })
})

router.get("/inDepartment/:department_id", (req, res)=>{
    knex.select("category_id", "name", "description", "department_id")
    .from("category")
    .where("department_id",req.params.department_id)
    .then(data=>{
        res.status(200).send(data)
    }).catch(err=>{
        res.send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500"
          })
    })
})



module.exports = router;