const express = require('express');
const router = express.Router();
const {Post,User,Comment} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User]
    }).then(postData=>{
        const hbsPosts = postData.map(post=>post.get({plain:true}))
        // res.json(hbsPosts)
        if(req.session.user){
            res.render("home",{
                posts:hbsPosts,
                username:req.session.user.username
            })
        }else{
            res.render("home",{
                
                posts:hbsPosts,
                
            })
        }
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Post, Comment]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        // res.json(hbsUser)
        res.render("profile",
        {
            users:hbsUser,
        })
    })
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

module.exports = router;