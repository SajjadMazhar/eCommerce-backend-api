const express = require("express")
const router = express.Router();
const knex = require("../config/db")

router.get("/", (req, res)=>{
    knex.select("tax_id","tax_type", "tax_percentage").from("tax")
    .then(data=>{
        res.send(data[0])
    }).catch(err=>{
        console.log(err.message)
        res.send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500"
          })
    })
})

router.get("/:tax_id", (req, res)=>{
    knex("tax").where({tax_id:req.params.tax_id})
    .then(data =>{
        res.send(data[0])
    }).catch(err=>{
        console.log(err.message);
        res.send("error")
    })
})

module.exports = router;