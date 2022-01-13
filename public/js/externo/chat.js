const socket = io.connect()//, {forceNew: true});


/* CHAT */
  //Connection / newConnection
const iniciar = () => {

    /* envía acá necesito el userId */
  const obj = {
    token: document.getElementById('token').value,
    mensaje: document.getElementById('mensaje').value
  }
  
  console.log(obj)
  socket.emit('new-mensaje', obj);
}

const enviar = document.getElementById('enviar');
enviar.addEventListener('click', iniciar);

socket.on('resp-mensaje', (data)=> {
  console.log(data)
})
// socket.on('chatConnectMessage', (data)=> {
//   const chat = document.getElementById("chat");
//   console.log(data);
//   const p = document.createElement("p");
//   p.innerHTML = `${data.username}: ${data.message}`;
//   chat.appendChild(p);
  
//   chat.scrollIntoView();
  
// })

// //emitMensaje / newConnection
// const enviar = () => {
//   const mensajeInput = document.getElementById("newMessage");
//   const nombre = document.getElementById("nombre").value;
//   const mensaje = mensajeInput.value;

//   const objMsg = {
//     message: mensaje,
//     username: nombre,
//   }
  
//   mensajeInput.value = "";
//   socket.emit('emitNewMessage', objMsg);
// }

// socket.on('receiveNewMessage', (data)=> {
//   const chat = document.getElementById("chat");
//   const p = document.createElement("p");
//   p.innerHTML = `<span style='color:blue;font-weight:bold;'>
//                       ${data.username}
//                   </span> - 
//                   <span style='color:brown;'>
//                       ${data.timestamp}
//                   </span>: 
//                   <span style='color:green;font-style:italic;'>
//                       ${data.message}
//                   </span>`;
//   chat.appendChild(p);
    
// })

// const desconectar = () => {
//   const nombre = document.getElementById("nombre").value;
//   socket.emit('chatDisconnect', nombre);

// }

// socket.on('chatDisconnectMessage', (data)=> {
//   const chat = document.getElementById("chat");
//   const p = document.createElement("p");
//   p.innerHTML = `<span style='color:brown;'>
//                       ${data.timestamp}
//                   </span>: 
//                   <span style='color:green;font-style:italic;'>
//                       ${data.message}
//                   </span>`;
//   chat.appendChild(p);
//   const nombre = document.getElementById('nombre').value;
//     //ocultar chatpanel
//     if (data.name == nombre) {
//       const chatPanel = document.getElementsByClassName("chatPanel");
//       chatPanel[0].style.display = "none";
//       const chatContainer = document.getElementsByClassName("chatContainer");
//       chatContainer[0].innerHTML = "<p>Gracias por utilizar el chat</p>";
//       console.log("desconetado")
//   }
// })
