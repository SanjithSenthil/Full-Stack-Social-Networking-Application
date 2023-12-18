import "./following.css";
import { Link } from 'react-router-dom';

function Following({user}) {
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture ? publicAssetsPath+user.profilePicture :  publicAssetsPath+"profilePictures/noProfilePicture.png"} alt="" className="rightbarProfileImg"/>
                </Link>
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Following