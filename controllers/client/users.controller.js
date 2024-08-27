
let user=require('../../model/user.model')
let usersSocket=require('../../sockets/client/users.socket')

module.exports.notFriend=async(req,res)=>{
    usersSocket(req,res)

    const userId=res.locals.Client.id
    let friendList=res.locals.Client.friendList.map(item=>{
        return item.userId
    })
    let users=await user.find({
        //$ne= not equal 
        //$nin= not in (array only)
        $and:[
       { _id:{ $ne:userId }},
       { _id:{$nin:res.locals.Client.requestFriends} },
       {_id:{$nin:res.locals.Client.acceptFriends} },
       {_id:{$nin:friendList}}
        ],
        status:'active',
        deleted:false
    }).select("id avatar fullName")
    res.render('client/pages/users/notFriend/index',{
       users:users
    })
}

module.exports.request=async(req,res)=>{
    usersSocket(req,res)

    let users=await user.find({
        //$ne= not equal 
        //$nin= not in (array only)
        $and:[
       { _id:{$in:res.locals.Client.requestFriends} }, ],
        status:'active',
        deleted:false
    }).select("id avatar fullName")

    res.render('client/pages/users/request/index',{
        users:users
    })

}

module.exports.accept=async(req,res)=>{
    usersSocket(req,res)
    let users=await user.find({
        //$ne= not equal 
        //$nin= not in (array only)
        $and:[
       { _id:{$in:res.locals.Client.acceptFriends} }, ],
        status:'active',
        deleted:false
    }).select("id avatar fullName")

    res.render('client/pages/users/accept/index',{
        users:users
    })

}

module.exports.friend=async(req,res)=>{

    usersSocket(req,res)

    let friendListId=res.locals.Client.friendList.map(item=>{
        return item.userId
    })
    let users=await user.find({
        //$ne= not equal 
        //$nin= not in (array only)
        $and:[
       { _id:{$in:friendListId} }, ],
        status:'active',
        deleted:false
    }).select("id avatar fullName")

    res.render('client/pages/users/friends/index',{
        users:users
    })

}