import "./message.css"
import {format} from "timeago.js"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { authContext } from "../../context/authContext";

function Message({message, own}){
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH
    const {user} = useContext(authContext)
    const[sender, setSender] = useState(null);
    useEffect(() => {
        const senderId = message.sender;
        const getSender = async () => {
            try {
                const res = await axios("/users?userId="+senderId);
                setSender(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getSender();
    }, [user, message])
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src={sender?.profilePicture ? publicAssetsPath+sender.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt="" className="messageImage" />
                <span className="messageText">{message.text}</span>
            </div>
            <div className="messageBottom">
                <span className="messageTime">{format(message.createdAt)}</span>
            </div>
        </div>
    )
}

export default Message