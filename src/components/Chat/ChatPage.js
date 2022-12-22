import React, { useEffect } from "react";
import "./Chat.css";
import ChatPreview from "./ChatPreview";
import ChatMessage from "./ChatMessage";
import { useState } from "react";
import { useParseQuery } from "@parse/react";
import Input from "../Input/Input";
import Form from "../StyledComponents/Containers/Form";
import getCurrentUser from "../../API/UserAPICalls";
import { getQueryForMessagesInSelectedChat } from "../../API/GeneralAPICalls";
import {
  getCurrentUsersChats,
  getIdOfMostRecentMessageInChat,
} from "../../API/SpecificAPICalls";
import { timeString } from "../../API/GeneralAPICalls";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addNewMessageObjectToChat } from "../../API/SpecificAPICalls";

const ChatPage = () => {
  const navigate = useNavigate();
  let selectedChat = useParams().chatId;
  let currentUser = getCurrentUser();

  const pathname = window.location.pathname;

  const [userChats, setUserChats] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const { results} =
    useParseQuery(getQueryForMessagesInSelectedChat(selectedChat), {
      enableLocalDatastore: true,
      enableLiveQuery: true,
    });

  useEffect(() => {
    const scrollToMessage = async () => {
      await getCurrentUsersChats(currentUser, setUserChats, undefined);
    const msgId = await getIdOfMostRecentMessageInChat(selectedChat);
    document.getElementById(msgId.id).scrollIntoView();
    };
    scrollToMessage().catch(console.error);
  }, [selectedChat, submittedMessage, currentUser]);

  const selectChat = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  const submitMessage = async function (e) {
    e.preventDefault();
    await addNewMessageObjectToChat(
      messageInput,
      currentUser.id,
      selectedChat,
      setMessageInput
    );
    setSubmittedMessage(messageInput);
  };


  const onChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div id="overall-chat-container">
      <div className="chat-preview-container">
        <div className="chat-headline">
          <h3>Chats</h3>
        </div>
        {userChats.length > 0 &&
          userChats.map((chat) => (
            <ChatPreview
              key={chat.id}
              img={chat.img.url()}
              badge={chat.badge}
              info={chat.name}
              currentMessage={chat.currentMessage}
              time={chat.time}
              active={pathname === `/chats/${chat.id}` ? true : false}
              onClick={() => selectChat(chat.id)}
            />
          ))}
      </div>
      <div id="chosen-chat-container">
        {results &&
          results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((message) => (
              <ChatMessage
                key={message.id}
                id={message.id}
                messageSender={message.get("SenderId").id}
                img={message.get("SenderId").attributes.ProfilePicture.url()}
                messageText={message.get("Text")}
                messageDate={timeString(message.get("createdAt"))}
                senderName={
                  message.get("SenderId").attributes.Name.split(" ")[0]
                }
                badge={message.get("SenderId").attributes.NativeLanguage}
              />
            ))}
      </div>
      <div className="message-input">
        <Form onSubmit={submitMessage}>
          <div className="input-btn-container">
            <Input onChange={onChange} value={messageInput} />
            <button className="icon-btn" type="onSubmit">
              <p className="material-symbols-outlined big-icon filled-icon ">
                send
              </p>
            </button>
          </div>
        </Form>
      </div>
      <div></div>
    </div>
  );
};

export default ChatPage;
