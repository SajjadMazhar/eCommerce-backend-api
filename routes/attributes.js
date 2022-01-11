const express = require("express");
const knex = require("../config/db")
const router = express.Router();

router.get("/", (req, res)=>{
    knex("attribute").then(data=>{
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

router.get("/:attribute_id",(req, res)=>{
    knex("attribute").where({attribute_id:req.params.attribute_id})
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

router.get("/values/:attribute_id", (req, res)=>{
    knex("attribute_value").where({attribute_id:req.params.attribute_id})
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
    knex.select("name", "attribute_value.attribute_value_id", "attribute_value.value")
    .from("attribute")
    .join("attribute_value", "attribute_value.attribute_id", "attribute.attribute_id")
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

module.exports = router;
