const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
require("dotenv").config()
const knex = require("./db")

//to create cookie
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

//to decode data from cookie
passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
    //option for the google strat
    clientID:process.env.CID,
    clientSecret:process.env.CSID,
    callbackURL:"http://localhost:4545/customer/auth/google/redirect"

    }, (accessToken, refreshToken, profile, done)=>{
    // passport callback function
        // console.log(profile)
        // check if user exists
        console.log(profile)
        User.findOne({googleId:profile.id})
        .then((currentUser)=>{
            if(currentUser){
                //already have the user
                // console.log("user is:", currentUser)
                done(null, currentUser)
            }else{
                //if not, create user
                User({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail:profile._json.picture
                }).save()
                .then(newUser=>{
                    // console.log("new user created:"+newUser)
                    done(null, newUser)
                }).catch(err=>{
                    console.log(err)
                    done(err, false)
                })
            }
        }).catch(err=>{
            console.log(err)
            done(err, false)
        });
        
    })
)