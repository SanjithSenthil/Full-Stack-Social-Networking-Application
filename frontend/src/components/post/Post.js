import "./post.css"
import { MoreVert } from "@material-ui/icons"
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { authContext } from "../../context/authContext";


function Post({post}) {
    const [like,setLike] = useState(post.likes.length);
    const [isLike,setIsLike] = useState(false);
    const [dislike,setDislike] = useState(post.dislikes.length);
    const [isDislike,setIsDislike] = useState(false);
    const [postUser,setPostUser] = useState({});
    const { user } = useContext(authContext);
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH

    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setPostUser(res.data);
        };
        fetchUser();
    },[post.userId]);

    useEffect(() => {
        setIsLike(post.likes.includes(user._id));
    }, [user._id, post.likes]);

    useEffect(() => {
        setIsDislike(post.dislikes.includes(user._id));
    }, [user._id, post.dislikes]);

    const likeHandler = () => {
        try {
          axios.put("/posts/" + post._id + "/like", {userId: user._id});
        } catch (err) {

        }
        setLike(isLike ? like - 1 : like + 1);
        setIsLike(!isLike);
    };

    const dislikeHandler = () => {
        try {
          axios.put("/posts/" + post._id + "/dislike", {userId: user._id});
        } catch (err) {

        }
        setDislike(isDislike ? dislike - 1 : dislike + 1);
        setIsDislike(!isDislike);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${postUser.username}`}>
                            <img src={postUser.profilePicture ? publicAssetsPath+postUser.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt="" className="postProfileImg"/>
                        </Link>
                        <span className="postUsername">{postUser.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.description}
                    </span>
                    <img src={post.image ? publicAssetsPath+post.image : ""} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={publicAssetsPath+"icons/like.png"} onClick={likeHandler} alt="" className="likeIcon"/>
                        <img src={publicAssetsPath+"icons/dislike.png"} onClick={dislikeHandler} alt="" className="likeIcon" />
                        <span className="postLikeCounter">{like-dislike} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comments.length} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post