
const chat=require('../../model/chat.model')
const User = require("../../model/user.model");
const streamUpload=require('../../helpers/streamUpload.helper')
module.exports=(req,res)=>{
    _io.once("connection", (socket) => {

        socket.on('typing',(data)=>{
          // GUI EMIT TO EVERYBODY
          socket.broadcast.emit('returnTyping',{
            userId:res.locals.Client.id,
            fullName:res.locals.Client.fullName,
            type: data
          })
        })
          // console.log("Có 1 người dùng kết nối", socket.id);
          // CLIENT_SEND_Typing
  
          // CLIENT_SEND_MESSAGE
          socket.on('CLIENT_SEND_MESSAGE',async(data)=>{
  
            console.log(data)
            chatData={
              userId:res.locals.Client.id,
              content:data.content,
            }
            const Img=[];
  
            for(const img of data.imgs){
                const result=await streamUpload(img)
                Img.push(result.url)
            }
  
            chatData.img=Img
  
            const check=new chat(chatData)
  
            await check.save()
          
          // tra tin nhan realtime
          //real time
          //_io sent mess to every body
          _io.emit('sever_return_message',{
            userId:res.locals.Client.id,
            fullName:res.locals.Client.fullName,
            content:data.content,
            img:Img
          })
        })
  
  
        });
  
}