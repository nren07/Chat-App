
const express=require('express');
const app=express();
const httpServer=require('http').createServer(app);
require('dotenv').config()
const port=process.env.PORT || 3000; //to retrive envirenment variables use this
const socketIo=require('socket.io');
const SocketIoServer=socketIo.Server;
const dataArray={};
const clients = new Map();

app.use(express.static('FrontEnd'));

//express create a server and if we want to make it as a http server then use create server method

//io is attached to httpsever 
const io=new SocketIoServer(httpServer);

//when connection establishment this event triggered
io.on('connection',(socket)=>{
    
    socket.on('login',(name,id)=>{
        clients.set(id,socket);
        let data={};
        data.name=name;
        data.id=id;
        dataArray[id]=data;
        io.emit('userDataPrint',dataArray);
        
    })
    socket.on('sending msg event',(data,socketId)=>{
        sendDataToSocket(socketId,data);
    })
})

function sendDataToSocket(socketId, data) {
    const socket = clients.get(socketId);
    socket.emit('message', data);
}

httpServer.listen(port,()=>{
    console.log("server start"+port);

})