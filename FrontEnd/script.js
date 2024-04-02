const socket = io();
const loginContainer = document.getElementById("login_container");
const header = document.getElementById("header");
const chatContainer = document.getElementById("chat_container");
const messageDiv = document.getElementById("message_div");
const loginBtn = document.getElementById("loginBtn");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const activeUserList = document.getElementById("activeUsers");
const chat = document.getElementById("chat");
let user = "";
let receiver = "";

loginBtn.addEventListener("click", (event) => {
  user = document.getElementById("user").value;
  createHeaderEle();
  socket.emit("login", user, socket.id);
  activeUserList.style.display = "flex";
  loginContainer.style.display = "none";
  chatContainer.classList.toggle("show");
});

function createHeaderEle() {
  const ele = document.createElement("h3");
  ele.innerText = `Hi ${user}`;
  ele.setAttribute("id", "sender");
  const ele2 = document.createElement("h1");
  ele2.innerText = "Chat Application";
  const ele3 = document.createElement("h3");
  ele3.setAttribute("id", "receiver");
  header.append(ele, ele2, ele3);
}

function getTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  const timeString = `${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  return timeString;
}

sendBtn.addEventListener("click", () => {
  let data = {
    id: socket.id,
    msg: input.value,
    user: user,
    time: getTime(),
  };

  socket.emit("sending msg event", data, receiver); // event is listened
  if (data.msg != "") {
    renderData(data, "SENT");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter" && input.value != "") {
    // Call the click event of the button
    sendBtn.click();
  }
});

function createEleOfMsg(data, typeofMsg) {
  if (typeofMsg === "SENT") {
    const ele = document.createElement("div");
    ele.className = "message";
    ele.innerHTML = `<p class="msg">${data.msg}</p>
    <div class="time">${data.time}</div>`;
    return ele;
  } else {
    const ele = document.createElement("div");
    ele.className = "message";
    ele.innerHTML = `<div class="userName">${data.user}</div>
    <p class="msg">${data.msg}</p>
    <div class="time">${data.time}</div>`;
    return ele;
  }
}

function renderData(data, typeofMsg) {
  var ele;
  if (typeofMsg === "SENT") {
    ele = createEleOfMsg(data, typeofMsg);
    ele.classList.add("sent");
  } else {
    ele = createEleOfMsg(data, "RECEIVED");
  }
  messageDiv.appendChild(ele);
  input.value = "";
}

socket.on("message", (data) => {
  if (data.id != socket.id) {
    receiver = data.id;
    renderData(data, "RECEIVED");
  }
});

socket.on("userDataPrint", (dataArray) => {
  activeUserList.innerHTML = "";
  for (let key in dataArray) {
    const iteam = dataArray[key];
    if (socket.id != key) {
      createActiveUserList(iteam);
    }
  }
});

function createActiveUserList(iteam) {
  const ele = document.createElement("input");
  const lable = document.createElement("label");
  lable.setAttribute("for", `${iteam.id}`);
  lable.textContent = `${iteam.name}`;
  ele.setAttribute("type", "radio");
  ele.setAttribute("name", "radio");
  ele.setAttribute("value", `${iteam.name}`);
  ele.style.display = "none";
  ele.setAttribute("id", `${iteam.id}`);
  ele.addEventListener("change", () => {
    receiver = iteam.id;
  });
  activeUserList.append(ele, lable);
}
