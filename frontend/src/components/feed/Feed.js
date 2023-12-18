import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authContext } from "../../context/authContext";

function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(authContext)
    useEffect(() => {
        const fetchPosts = async() => {
            if (username) {
                const res = await axios.get("/posts/profile/"+username);
                setPosts(res.data.sort((p1, p2) => { return new Date(p2.createdAt) - new Date(p1.createdAt) }));
            }
            else {
                const res = await axios.get("/posts/timeline/" + user._id);
                setPosts(res.data.sort((p1, p2) => { return new Date(p2.createdAt) - new Date(p1.createdAt) }));
            }
        };
        fetchPosts();
    },[username,user._id]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || user.username === username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}

export default Feed