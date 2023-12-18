import { useContext, useEffect, useState } from "react";
import { Twitter, LinkedIn, Instagram, Facebook } from "@material-ui/icons";
import Followers from "../followers/Followers";
import axios from "axios";
import { authContext } from "../../context/authContext";
import "./sidebar.css";


function Sidebar() {
    const { user } = useContext(authContext);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const getFollowers = async () => {
          try {
            const friendList = await axios.get("/users/followers/" + user._id);
            setFollowers(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFollowers();
    }, [user]);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <h4 className="rightbarTitle">Your Social Profiles:</h4>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Twitter className="sidebarIcon"/>
                        <span className="sidebarListItemText">Twitter</span>
                    </li>
                    <li className="sidebarListItem">
                        <LinkedIn className="sidebarIcon" />
                        <span className="sidebarListItemText">LinkedIn</span>
                    </li>
                    <li className="sidebarListItem">
                        <Instagram className="sidebarIcon" />
                        <span className="sidebarListItemText">Instagram</span>
                    </li>
                    <li className="sidebarListItem">
                        <Facebook className="sidebarIcon" />
                        <span className="sidebarListItemText">Facebook</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show more</button>
                <hr className="sidebarHr"/>
                <h4 className="rightbarTitle">Your Followers:</h4>
                <ul className="sidebarFriendList">
                    {followers.map((u)=>(
                        <Followers id={u._id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar