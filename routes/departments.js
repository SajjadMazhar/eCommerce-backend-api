const express = require("express");
const knex = require("../config/db")
const router = express.Router();

router.get("/", (req, res)=>{
    knex("department").then(data =>{
        res.status(200).send(data)
    }).catch(err=>{
        res.status(400).send({
            "code": "USR_02",
            "message": err.message,
            "field": "example",
            "status": "500"
          })
    })
})

router.get("/:department_id", (req, res)=>{
    knex("department").where({department_id:req.params.department_id})
    .then(data=>{
        res.status(200).send(data)
    }).catch(err =>{
        res.status(400).send({
            "code": "USR_02",
            "message": err.message,
            "field": "example",
            "status": "500"
          })
    })
})

module.exports = router;