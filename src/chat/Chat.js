import React, { useState, useEffect } from "react";
import "../../src/chat/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";

import AtachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../../src/stateProvider/stateProvider";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(roomId);
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      console.log(messages);
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You type >>> ", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const defineImgToEnterprises = (messageName) => {
    switch (messageName) {
      case "Art Experience":
        return "https://tse4.mm.bing.net/th?id=OIP.OV7RjYeNKemZctX8j5FYPQAAAA&pid=Api&P=0&w=300&h=300";
        break;

      case "Cyber Manager":
        return "https://scontent.fmvd1-1.fna.fbcdn.net/v/t1.0-9/51672218_2069086196502228_3916883399402323968_n.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=OmfK41LvKAUAX85Da9r&_nc_oc=AQlX3LSZuhKpAyY3EhQP6rieao0BMK4EkitFLAcGXcGNOWOJTIX16yOEx8RDSyWxKQY&_nc_ht=scontent.fmvd1-1.fna&oh=f38c8c9a8ad7748a9dafec29a119beab&oe=5F65E4AE";
        break;

      case "Zero By One":
        return "https://avatars1.githubusercontent.com/u/53923351?s=200&v=4";
        break;

      default:
        return `https://avatars.dicebear.com/api/human/${seed}.svg`;
        break;
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={defineImgToEnterprises(roomName)} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AtachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          // Validate if the user is logged and if is logged so the chat will paint message green and right!
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            type="text"
          ></input>
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
