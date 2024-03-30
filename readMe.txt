Note: 
--socket io require http server 

--app.use(express.static('FrontEnd')); to send responce to FrontEnd

--port=process.env.PORT || 5000; //to retrive envirenment variables use this

--express server listen all api endpoint, not need to listen on app if we use socket then listen on http server
--io is a server that is attached to our server http

--socketIoServer is a class which can create a server

Socket & io
--socket and io work (on) events 
-- thre can be two type of evens 
1       defaults(lke....click ...keyup or down or submit ) events and custom events 

-- we use (on) event insteed of addEventListener and pass a callback function where event act as a socket
        so we pass socket in call back function


Example btn.addEventListener("click",(even)=>{
    //event.target gives as information regarding to event
})

// same as socket gives as information related to event emitted 
//this a client side importing socket.io so that we can emit our event from client also
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js" integrity="sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO" crossorigin="anonymous"></script>
