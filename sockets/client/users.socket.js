
const chat=require('../../model/chat.model')
const User = require("../../model/user.model");

module.exports=(req,res)=>{
    let userA=res.locals.Client.id

    _io.once("connection", (socket) => {

        let fullName=res.locals.Client.fullName
       
        socket.on("CLIENT_ADD_FRIEND",async(userIdB)=>{

            const userAinB=await User.findOne({
                _id:userIdB,
                acceptFriends: userA
            })

            if(!userAinB){
                await User.updateOne({
                    _id:userIdB
                },{
                    $push:{
                        acceptFriends :userA
                    }
                })
            }


            const userBinA=await User.findOne({
                _id:userA,
                requestFriends: userIdB
            })

            if(!userBinA){
                await User.updateOne({
                    _id:userA
                },{
                    $push:{
                        requestFriends: userIdB
                    }
                })
            }

            const infoB=await User.findOne({
                _id:userIdB
            })

            socket.broadcast.emit('SEVER_RETURN_LENGTH_ACCEPT_LENGTH',{
                length:infoB.acceptFriends.length,
                userId: userIdB

            })

            const infoA=await User.findOne({_id:userA}).select('id fullName avatar')

            socket.broadcast.emit('SEVER_RETURN_LENGTH_INFO_ACCEPT_LENGTH',{
            infoA:infoA,
            userIdB:userIdB
            })


            socket.broadcast.emit('SEVER_RETURN_ID_INFO_ACCEPT_FRIEND',{
                userIdA:userA,
                userIdB:userIdB
            })



            
        })

        socket.on("CLIENT_CANCEL_FRIEND",async(userIdB)=>{

            const userAinB=await User.findOne({
                _id:userIdB,
                acceptFriends: userA
            })

            if(userAinB){
                await User.updateOne({
                    _id:userIdB
                },{
                    $pull:{
                        acceptFriends :userA
                    }
                })
            }


            const userBinA=await User.findOne({
                _id:userA,
                requestFriends: userIdB
            })

            if(userBinA){
                await User.updateOne({
                    _id:userA
                },{
                    $pull:{
                        requestFriends: userIdB
                    }
                })
            }

            const infoB=await User.findOne({
                _id:userIdB
            })

            socket.broadcast.emit('SEVER_RETURN_LENGTH_ACCEPT_LENGTH',{
                length:infoB.acceptFriends.length,
                userId: userIdB

            })

            socket.broadcast.emit('SEVER_RETURN_ID_CANCEL_FRIEND',{
                userIdB: userIdB,
                userIdA: userA
            })
            
        })

        socket.on("CLIENT_REFUSE_FRIEND",async(userIdB)=>{

            const userBinA=await User.findOne({
                _id:userA,
                acceptFriends: userIdB
            })

            if(userBinA){
                await User.updateOne({
                    _id:userA
                },{
                    $pull:{
                        acceptFriends :userIdB
                    }
                })
            }


            const userAinB=await User.findOne({
                _id:userIdB,
                requestFriends: userA
            })

            if(userAinB){
                await User.updateOne({
                    _id:userIdB
                },{
                    $pull:{
                        requestFriends: userA
                    }
                })
            }
            
        })
        
        socket.on("CLIENT_ACCEPT_FRIEND",async(userIdB)=>{

            const userBinA=await User.findOne({
                _id:userA,
                acceptFriends: userIdB
            })

            if(userBinA){
                await User.updateOne({
                    _id:userA
                },{

                    $push:{
                       friendList:{
                        userId:userIdB,
                        roomChatId:""
                       }     
                    },
                    $pull:{
                        acceptFriends :userIdB
                    }
                })
            }


            const userAinB=await User.findOne({
                _id:userIdB,
                requestFriends: userA
            })

            if(userAinB){
                await User.updateOne({
                    _id:userIdB
                },{
                    $push:{
                        friendList:{
                         userId:userA,
                         roomChatId:""
                        }     
                     },
                    $pull:{
                        requestFriends: userA
                    }
                })
            }
            
        })



        }
    
    
    );
  
    

}