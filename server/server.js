import express from "express";
import cors from "cors"
import http from "http"
import { Server} from "socket.io"

import router from "./router"

 const app = express();

 const server = http.createServer(app)

 const io = new Server(server
   // ,{
   //  cors : {
   //      origin:"http://localhost:5173/",
   //      methods:[ "GET", "PUT"]
   //  }
//  }
 )

 io.on("connection", (socket)=> {console.log(socket.id)

    socket.on("join_room", (data)=>{
       socket.join(data);
       console.log(`User Id :- ${socket.id} joined room : ${data}`)
 })

    socket.on("send_message",(data)=>{
        console.log("send message data", data)

        socket.to(data.room).emit("receive_message", data)
    })

     socket.on("disconnect", ()=>{
        console.log("User Disconnected..", socket.id)
     })
})

server.get("/", ()=>{
   console.log(hello)
})

 app.use(cors())
 app.use(router)

 server.listen( process.env.PORT || 3000 , ()=> console.log(" server is ruuning on port 3000"))

 