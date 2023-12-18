import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navigationbar from "../../components/navigationbar/Navigationbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import "./profile.css";


function Profile() {
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH;
    const [user,setUser] = useState({});
    const params = useParams();
    const username = params.username;
    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    },[username]);
    return (
        <div>
            <Navigationbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImage" src={user.coverPicture ? publicAssetsPath+user.coverPicture : publicAssetsPath+"coverPictures/noCoverPicture.png"} alt=""/>
                            <img className="profileUserImage" src={user.profilePicture ? publicAssetsPath+user.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt=""/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoAbout">{user.about}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>     
            </div>
        </div>
    );
};

export default Profile;