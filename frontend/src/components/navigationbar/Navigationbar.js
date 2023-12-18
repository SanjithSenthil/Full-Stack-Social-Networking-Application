import { useContext } from "react";
import { Link } from 'react-router-dom';
import { Search, Notifications, Chat } from "@material-ui/icons";
import { authContext } from "../../context/authContext";
import "./navigationbar.css";

function Navigationbar() {
    const { user } = useContext(authContext);
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH;
    return (
        <div className="navigationbarContainer">
            <div className="navigationbarLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="navigationbartitle">Social Networking Application</span>
                </Link>
            </div>
            <div className="navigationbarCenter">
                <div className="navigationbarSearchbar">
                    <Search className="navigationbarSearchIcon"/>
                    <input className="navigationbarSearchInput" type="text" placeholder="Discover new connections, posts and videos"/>
                </div>
            </div>
            <div className="navigationbarRight">
                <div className="navigationbarIcons">
                    <div className="navigationbarIconItem">
                        <Notifications />
                        <span className="navigationbarIconNumber">
                            2
                        </span>
                    </div>
                    <Link to={"/chat"} style={{ textDecoration: "none" }} >
                        <div className="navigationbarIconItem" style={{ color: "white" }}>
                            <Chat />
                            <span className="navigationbarIconNumber">
                                4
                            </span>
                        </div>
                    </Link>
                </div>
                <Link to={"/profile/"+user.username}>
                    <img className="navigationbarImg" src={user.profilePicture ? publicAssetsPath+user.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt=""/>
                </Link>
            </div>
        </div>
    );
};

export default Navigationbar;