const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//update user

router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(error){
                return res.status(500).json(error);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            })
            res.status(200).json("Account has been updated successfully");
        } catch(error){
            return res.status(500).json(error);
        }

    }else{
        return res.status(403).json("You can update only your account details")
    }
})
//delete user
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        } catch(error){
            return res.status(500).json(error);
        }

    }else{
        return res.status(403).json("You can delete only your account details")
    }
})



//get friends

router.get("/friends/:userId", async(request,response)=>{
    try{
        const user = await User.findById(request.params.userId);
        const friendsData = await Promise.all(
            user.followins.map((friendId,friend)=>{
                return User.findById(friendId);
            })
        )

        const friendList = [];
        friendsData.map((friend)=>{
            const {_id,username,profilePicture} = friend ;
            friendList.push({_id,username,profilePicture});
        })

        response.status(200).json(friendList);

    }catch(error){
        response.status(500).json(error);
    }
    
})
//get a user by id or username
router.get("/",async (req,res)=>{

    const userId = req.query.userId ;
    const username = req.query.username ;

    try{
        const user = userId ?  await User.findById(userId) : await User.findOne({username:username});
        const {password,updatedAt,createdAt,...other} = user._doc ;
        res.status(200).json(other);
    }catch(error){
        return res.status(500).json(error);
    }
})
//follow a user
router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push : { followers : req.body.userId}});
                await currentUser.updateOne({$push:{ followins:req.params.id}});
                res.status(200).json("User has been followed successfully");
            }else{
                return res.status(200).json("You already follow this user");
            }

        }catch(error){
            return res.status(500).json(error);
        }

    }else{
        return res.status(403).json("you can't follow yourself");
    }
    
})
//unfollow a user
router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : { followers : req.body.userId}});
                await currentUser.updateOne({$pull:{ followins:req.params.id}});
                res.status(200).json("User has been unfollowed successfully");
            }else{
                return res.status(200).json("You don't follow this user");
            }

        }catch(error){
            return res.status(500).json(error);
        }

    }else{
        return res.status(403).json("you can't unfollow yourself");
    }
    
})

module.exports = router ;