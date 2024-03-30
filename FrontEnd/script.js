

const socket=io();
const formContainer=document.getElementById("form_container");
const messageContainer=document.getElementById("message_container");
const messageDiv=document.getElementById("message_div");
const loginBtn=document.getElementById("login");
const message=document.getElementById("message");
const sendBtn=document.getElementById("sendBtn");
let user='';

loginBtn.addEventListener("click", (event)=>{
    user=document.getElementById("user").value;
    formContainer.style.display="none";
    messageContainer.classList.toggle("show");
});


sendBtn.addEventListener("click",()=>{
    let data={
        id:socket.id,
        msg:message.value,
        user:user,
    }
    socket.emit('sending msg event',data); // event is listened

    if(data.msg!=""){
        renderData(data,'SENT');
    }
})

document.addEventListener("keydown",(event)=>{
    if (event.code === "Enter" && message.value!="") {
        // Call the click event of the button
       sendBtn.click();
    }
});

function renderData(data,typeofMsg){
    const msgDiv=document.createElement('div');
    msgDiv.innerText=`${data.user}: ${data.msg}`;
    if(typeofMsg==='SENT'){
        msgDiv.classList.add("msg", "sent");
    }
    else{
        msgDiv.classList.add("msg");
    }
    messageDiv.appendChild(msgDiv);
    message.value="";
}


socket.on('io is spreding',(data)=>{
    if(data.id!=socket.id){
        renderData(data,"RECEIVED");
    }
})