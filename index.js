
const express=require('express');
const app=express();
const httpServer=require('http').createServer(app);
require('dotenv').config()
const port=process.env.PORT || 3000; //to retrive envirenment variables use this
const socketIo=require('socket.io');
const SocketIoServer=socketIo.Server;

// <--to send string to the browser-->
// app.get("/" ,(req,res)=>{
//     res.send("hello");
// })

//insteed sending this string we can send to frontend 

app.use(express.static('FrontEnd'));

//express create a server and if we want to make it as a http server then use create server method

//io is attached to httpsever 
const io=new SocketIoServer(httpServer);

//when connection establishment this event triggered
io.on('connection',(socket)=>{
    socket.on('sending msg event',(data)=>{ //this is a event listener
        io.emit('io is spreding',data)  //this is a event
    })
})

httpServer.listen(port,()=>{
    console.log("server start"+port);

})