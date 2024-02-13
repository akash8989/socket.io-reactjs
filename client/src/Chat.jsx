import React, { useEffect, useRef, useState } from 'react'
import music1 from "./iphone.mp3"

const Chat = ({socket, username, room}) => {

    const [currMessage, setCurrMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const notification = new Audio(music1)
  

    const sendMessage=async()=>{
        if(currMessage !== ""){
            const messageData = {
                id: Math.random(),
                room : room,
                author:username,
                message: currMessage,
                time: (new Date(Date.now()).getHours()%12 + ":" + new Date(Date.now()).getMinutes() < 10 ?
                new Date(Date.now()).getHours()%12 + ":" + 0 + new Date(Date.now()).getMinutes() :
                new Date(Date.now()).getHours()%12 + ":" + new Date(Date.now()).getMinutes()  )
            }

            await socket.emit("send_message", messageData)
            setMessageList((list)=>[...list, messageData])
            setCurrMessage("")
            notification.play()
        }
    }

    useEffect(()=>{
        const handleReceiveMsg=(data)=>{
            setMessageList((list)=>[...list, data])
        }
        socket.on("receive_message",handleReceiveMsg )
        return()=>{
        socket.off("receive_message", handleReceiveMsg)
        }
    }, [socket])

    const containRef= useRef(null)
    useEffect(()=>{
        containRef.current.scrollTop = containRef.current.scrollHeight
    }, [messageList])

  return (
  <div className="chat_container">
    <h1>Welcome <span>{username}</span></h1>
    <div className="chat_box">
        <div className="auto-scrolling-div" ref={containRef}  style={{
                height:"450px",
                overflowY: "auto",
                border: "2px solid cyan"
            }}>
           
       
        {
         messageList.map((list)=>(
             <div key={list.id} className="message_content" id={username == list.author ? "you" : "other"}>
                <div>
                    <div className="msg"
                    id={username == list.author ? "y" : "b"}
                    >
                        <p>{list.message}</p>
                    </div>
                    <div className="msg_detail">
                        <p>{list.author}</p>
                        <p>{list.time}</p>
                    </div>
                </div>
             </div>
         
         ))
        }
         </div>
        <div className="chat_body">
            <input type="text" placeholder='Type Your Message...' 
            value={currMessage}
            onChange={(e)=> setCurrMessage(e.target.value)}
            onKeyPress={(e)=>{e.key ==="Enter" && sendMessage()}}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  </div>
  )
}

export default Chat
