import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './Chat.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase'
import { useStateValue } from './StateProvider';



function Chat() {


    const [emoji, setEmoji]= useState(false);


    const [{ user }, dispatch] = useStateValue();   

const [seed, setSeed] = useState("");

const [input, setInput]= useState("");

const { roomId } = useParams();

const [roomName, setRoomName] = useState("");

const [messages, setMessages] = useState([]);




const emojiActivate = () => {
    setEmoji(!emoji)
}


useEffect(() => {

if (roomId) {
    db.collection("rooms")
    .doc(roomId)
    .onSnapshot((snapshot) => 
        setRoomName(snapshot.data().name))

        db.collection('rooms').doc(roomId).collection('messages')
        .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
             setMessages(snapshot.docs.map(doc => doc.data()))
            ))
}

}, [roomId]);


    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000))
    
    }, [roomId]);


const sendMessage = (e) => {

e.preventDefault();



db.collection('rooms').doc(roomId).collection('messages').add({
  name:user.displayName,
  message:  input,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
});


setInput("");

};



    return (
        <div className='Chat'>
            
<div className='chat__header'>

<Avatar src={`https://avatars.dicebear.com/api/bottts/male/${seed}.svg`}/>

<div className="chat__headerInfo">
<h3> {roomName} </h3>
<p> Last seen at ... {" "} {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()} 
    </p>
</div>

<div className="chat__headerRight">

<IconButton>
<SearchOutlinedIcon />
</IconButton>
<IconButton>
<AttachFileOutlinedIcon/>
</IconButton>
<IconButton>
<MoreVertOutlinedIcon />
</IconButton>


</div>

</div>






<div className='chat__body'>


{messages.map((message) => (

    <p className={`chat__message ${ message.name === user.displayName && "chat__reciever"} `} >

    <span className="chat__name"> {message.name} </span>
    
    {message.message}
    
    
    <span className="chat__timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()} </span>
    
    </p>

))}





</div>

<div className='chat__footer'>





<IconButton onClick={emojiActivate}>
<InsertEmoticonOutlinedIcon />
</IconButton>





<form>
<input
onChange={e => setInput(e.target.value)}
value={input}
type="text"/>
<button type="submit" onClick={sendMessage}>
Send a message
</button>

</form>



<IconButton >

<MicOutlinedIcon />
</IconButton>





</div>

<div className={!emoji? "emojiBox" : "emojiBoxEnable" }>
😀😃 😄 
😁 😆 😅 
🤣 😂 🙂 
🙃 😉 😊  
😍 🤩 😗 
😋 😛 😜 
🤪 😝 🤑 
🤗 🤔 🤐 
🤨 😐 😑 
😇 🥰

</div>


        </div>
    )
}

export default Chat
