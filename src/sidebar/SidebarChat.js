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
