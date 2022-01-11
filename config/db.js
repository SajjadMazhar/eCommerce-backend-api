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
module.exports = knex;