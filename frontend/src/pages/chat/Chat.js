import { useContext, useEffect, useState } from "react";
import Navigationbar from "../../components/navigationbar/Navigationbar";
import Friends from "../../components/friends/Friends";
import Message from "../../components/message/Message";
import { authContext } from "../../context/authContext";
import axios from "axios"
import "./chat.css"


function Chat(){
    const { user } = useContext(authContext);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    useEffect(() => {
        const getChats = async () => {
            try {
                const res = await axios.get("/conversations/"+user._id);
                setChats(res.data);
            } catch(err) {

            }            
        }
        getChats();
    }, [user._id]);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/"+currentChat?._id);
                setMessages(res.data);
            } catch(err) {

            }
        }
        getMessages();
    }, [currentChat]);
    const submitHandler = async (e) => {
        e.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage
        };
        try {
            const res = await axios.post("/messages/create", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch(err) {

        }
    };
    return (
        <>
            <Navigationbar />
            <div className="chat">
                <div className="chatFriendsList">
                    <div className="chatFriendsListWrapper">
                        <span className="chatFriendsListTitle">Your Friends:</span>
                        {chats.map((c) => {
                            return (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Friends conversation={c}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="chatPane">
                    <div className="chatPaneWrapper">
                        {currentChat ? <>
                        <div className="chatPaneTop">
                            {messages.map(m => {
                                return <Message message={m} own={m.sender === user._id}/>
                            })}
                        </div>
                        <div className="chatPaneBottom">
                            <textarea className="chatMessageInput" onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} placeholder="Start typing a message..."></textarea>
                            <button className="chatSubmitButton" onClick={submitHandler}>Send</button>
                        </div> </> : <> <span className="noOpenedChat"></span> </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;