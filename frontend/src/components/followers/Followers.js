import "./followers.css"
import { Link } from 'react-router-dom';

function Followers({user}) {
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH
    return (
        <li className="sidebarFriend">
            <Link to={`profile/${user.username}`}>
                <img src={user.profilePicture ? publicAssetsPath+user.profilePicture :  publicAssetsPath+"profilePictures/noProfilePicture.png"} alt="" className="sidebarFriendImg"/>
            </Link>
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default Followers