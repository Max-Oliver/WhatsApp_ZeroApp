import React, { useEffect, useState } from "react";
import "../../src/sidebar/SidebarChat.css";
import { Avatar, IconButton } from "@material-ui/core";
import db from "../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 3000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const defineImgToEnterprises = (messageName) => {
    switch (messageName) {
      case "Art Experience":
        return "https://i.ibb.co/tX6fWBw/art-logo.jpg";
        break;

      case "Cyber Manager":
        return "https://i.ibb.co/yFBK42F/cyber-manager.jpg";
        break;

      case "Zero By One":
        return "https://avatars1.githubusercontent.com/u/53923351?s=200&v=4";
        break;

      default:
        return `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`;
        break;
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={defineImgToEnterprises(name)} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
