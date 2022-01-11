const express = require("express");
const router = express.Router();
const knex = require("../config/db")

router.get("/regions", (req, res)=>{
    knex("shipping_region").then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err.message);
        res.send("error")
    })
})

router.get("/regions/:shipping_region_id", (req, res)=>{
    knex("shipping").where({shipping_region_id:req.params.shipping_region_id})
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err.message)
    })
})

module.exports = router;    