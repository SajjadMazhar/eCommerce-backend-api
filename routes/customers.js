const express = require("express");
const { verifyToken, createToken } = require("../auth/jwt_auth");
const router = express.Router()
const knex = require("../config/db")
const passport = require("passport")

router.put("/", verifyToken, (req, res)=>{
    knex("customer").where({customer_id:req.data.customer_id})
    .update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.eve_phone
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(400).send(err.message)
    })
})

router.get("/", verifyToken, (req, res)=>{
    knex("customer").then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(400).send(err.message)
    })
})

router.post("/", (req, res)=>{
    if(req.body.name == undefined || req.body.email == undefined || req.body.address_1 == undefined || req.body.city == undefined ||req.body.region == undefined || req.body.postal_code == undefined || req.body.country == undefined || req.body.day_phone == undefined || req.body.eve_phone == undefined || req.body.mob_phone == undefined){
        res.send("please fillup all the required fields")
    }else{
        knex("shipping_region").then(data1=>{
            knex("customer").insert({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                address_1:req.body.address_1,
                address_2:req.body.address_2,
                city:req.body.city,
                region:req.body.region,
                postal_code:req.body.postal_code,
                country:req.body.country,
                day_phone:req.body.day_phone,
                eve_phone:req.body.eve_phone,
                mob_phone:req.body.mob_phone,
                shipping_region_id:data1[0].shipping_region_id
            }).then(()=>{
                res.send("data inserted")
            }).catch(err=>{
                res.send("error while inserting"+err.message)
            })
        }).catch(err=>{
            res.send("error while accessing region"+err.message)
        })
    }
})

router.post("/login", (req, res)=>{
    if(req.body.email == undefined || req.body.password == undefined){
        res.send("Enter email and password")
    }else{
        knex("customer").where({email:req.body.email, password:req.body.password})
        .then(data => {
            if(data.length>0){
                const token = createToken(data[0]);
                res.cookie("token",token).send("login successful")
            }else{
                res.send("you are not registered")
            }
        }).catch(err=>{
            console.log(err.message)
            res.send("error while matching credentials")
        })
    }
})

router.put("/address", verifyToken, (req, res)=>{
    const address = {
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.postal_code,
        country:req.body.country,
        shipping_region_id:req.body.shipping_region_id
    }
    knex("customer").where({customer_id:req.data.customer_id})
    .update(address)
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err.message)
        res.send("error while updating address")
    })
})

router.get("/google", passport.authenticate("google", {
    scope:["profile"]
}))

//callback route for google to redirect to
router.get("/auth/google/redirect",passport.authenticate("google"), (req, res)=>{
    // res.send(req.user)
    res.send("logged in with google")
})

router.put("/creditCard",verifyToken, (req, res)=>{
    knex("customer").where({customer_id:req.data.customer_id})
    .update({
        credit_card:req.body.credit_card
    }).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err.message)
        res.send({
            "error": "NotFoundError: This route don't exist!"
            })
    })
})


module.exports = router;