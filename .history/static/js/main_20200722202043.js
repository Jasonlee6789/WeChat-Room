//前端逻辑

const socket = io("ws://localhost:3000");

//send 发射 定义的chatMessage 和对用的值client
// socket.emit("chatMessage", "client");

const urlSearchParams = new URLSearchParams(location.search);
const username = urlSearchParams.get("username");
//登录
socket.emit("joinChatRoom", {
  username,
});

//1。获取输入信息框点击等
const sendBtn = document.querySelector("#sendBtn");
const msgInput = document.querySelector("#msg");

sendBtn.onclick = () => {
  console.log(msgInput.value);
  //2、把值发送给后端
  socket.emit("chatMessage", msgInput.value);
  msgInput.value = "";
  return false;
};

socket.on("message", (data) => {
  // render the data div
  const { msg, username, timer } = data;
  console.log(username);
  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message");
  messageDiv.innerHTML = `<p class="meta">${username}</p><p>${msg}</p><p>${timer}</p>`;

  const container = document.querySelector(".chat-messages");
  container.appendChild(messageDiv);
});
