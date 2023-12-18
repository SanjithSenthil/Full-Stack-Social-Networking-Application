import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../../context/authContext";
import "./friends.css";


function Friends({conversation}) {
    const { user } = useContext(authContext);
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH;
    const[friend, setFriend] = useState(null);
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== user._id);
        const getFriend = async () => {
            try {
                const res = await axios("/users?userId="+friendId);
                setFriend(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getFriend();
    }, [user, conversation])
    return (
        <div className="chatList">
            <img className="chatListImage" src={friend?.profilePicture ? publicAssetsPath+friend.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt=""/>
            <span className="chatListName">{friend?.username}</span>
        </div>
    );
};

export default Friends;