require("dotenv").config()
const knex = require("knex")({
    client:"mysql",
    connection:{
        host :process.env.HOST,
        user:process.env.USER_DB,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    }
})

knex.schema.createTable("cart", t=>{
    t.increments("item_id").primary()
    t.integer("cart_id")
    t.integer("product_id")
    t.string("attributes")
    t.integer("quantity")
    t.integer("buy_now")
    t.datetime("added_on")
}).then(()=>{
    console.log("cart created")
}).catch(err=>{
    console.log(err.message)
})

knex.schema.createTable("saved", t=>{
    t.increments("item_id").primary()
        t.integer('cart_id');
        t.integer('product_id');
        t.string('attributes');
        t.integer('quantity');
        t.integer('buy_now');
        t.datetime('added_on');
     }).then(() => {
        console.log("saved created")
     }).catch(() => {
        console.log("error");
    })
    
knex.schema.createTable("google_login", t=>{
    t.string("google_id");
    t.string("username")
    t.string("picture")
}).then(()=>{
    console.log("table created")
}).catch(err=>{
    console.log(err.message)
})
module.exports = knex;