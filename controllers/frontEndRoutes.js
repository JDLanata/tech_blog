const express = require('express');
const router = express.Router();
const {Post,User,Comment} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User]
    }).then(PostData=>{
        const hbsPosts = PostData.map(Post=>Post.get({plain:true}))
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
        include:[Post]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("profile",hbsUser)
    })
})

router.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = router;