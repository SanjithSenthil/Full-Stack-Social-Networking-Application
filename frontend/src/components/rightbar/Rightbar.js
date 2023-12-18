import "./rightbar.css";
import Following from "../following/Following";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { Add, Remove } from "@material-ui/icons";
import { Link } from 'react-router-dom';

function Rightbar({user}) { 
    const { user: loggedInUser } = useContext(authContext)
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH
    const [followers, setFollowers] = useState([]);
    const[isFollow,setIsFollow] = useState(loggedInUser.following.includes(user?._id))
    const [following, setFollowing] = useState([]);
    useEffect(() => {
        if (loggedInUser && user) {
          setIsFollow(loggedInUser.following.includes(user._id));
        }
      }, [loggedInUser, user]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/followers/" + user._id);
                setFollowers(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
      }, [user]);
    useEffect(() => {
    const getFollowers = async () => {
        try {
            const friendList = await axios.get("/users/following/" + loggedInUser._id);
            setFollowing(friendList.data);
        } catch (err) {
            console.log(err);
        }
    };
    getFollowers();
    }, [loggedInUser]);
    const followHandler = async () => {
        try {
            if (isFollow) {
              await axios.put(`/users/unfollow/${user._id}`, {userId: loggedInUser._id});
            } else {
              await axios.put(`/users/follow/${user._id}`, {userId: loggedInUser._id});
            }
            setIsFollow(!isFollow);
        } catch (err) {

        }
    }
    const HomeRightbar = () => {
        return (
            <div>
                <img src={publicAssetsPath+"advertisements/1.jpeg"} alt="" className="rightbarAd"/>
                <h4 className="rightbarTitle">Your Following:</h4>
                <ul className="rightbarFriendList">
                    {following.map((u)=>(
                        <Following key={u._id} user={u}/>
                    ))}
                </ul>
            </div>
        )
    }
    const ProfileRightbar = () => {
        return (
            <div>
                <button className="rightbarFollowButton" onClick={followHandler}>
                    {!isFollow ? "Follow" : "Unfollow"}
                    {!isFollow ? <Add /> : <Remove />}
                </button>
                <h4 className="rightbarTitle">User Information:</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Personality Type:</span>
                        <span className="rightbarInfoValue">{user.personalityType}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Interests:</span>
                        <span className="rightbarInfoValue">{user.interests}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Aspirations:</span>
                        <span className="rightbarInfoValue">{user.aspirations}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Life Style:</span>
                        <span className="rightbarInfoValue">{user.lifestyle}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Followers:</h4>
                <div className="rightbarFollowings">
                    {followers.map((friend) => {
                        return(
                        <div className="rightbarFollowing">
                            <Link to={`${friend.username}`}>
                                <img src={friend.profilePicture ? publicAssetsPath+friend.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt="" className="rightbarFollowingImg"/>
                            </Link>
                            <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                    )
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}               
            </div>
        </div>
    )
}

export default Rightbar