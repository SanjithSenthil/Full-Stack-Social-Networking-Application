import { useContext, useRef, useState } from "react"
import "./share.css"
import { PhotoSizeSelectActual, Videocam, AttachFile, Mic } from "@material-ui/icons"
import { authContext } from "../../context/authContext";
import axios from "axios";

function Share() {
    const { user } = useContext(authContext);
    const publicAssetsPath = process.env.REACT_APP_PUBLIC_ASSETS_PATH
    const description = useRef();
    const [file, setFile] = useState(null);
    const fileHandler = (e) => {
        setFile(e.target.files[0])
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            description: description.current.value
        }
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            try {
                await axios.post("/upload", data);
            } catch (err) {

            }
            newPost.image = "posts/"+file.name;
        }
        try {
            await axios.post("/posts/create",newPost);
            window.location.reload();
        } catch(err) {

        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? publicAssetsPath+user.profilePicture : publicAssetsPath+"profilePictures/noProfilePicture.png"} alt="" className="shareProfileImg" />
                    <textarea ref={description} placeholder={"Share your thoughts with us, "+user.username+"!"} type="text" className="shareInput" />
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="fileInput" className="shareOption">
                            <PhotoSizeSelectActual htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Image</span>
                            <input type="file" onChange={fileHandler} style={{ display: "none" }} accept=".jpeg,.jpg,.png" id="fileInput"/>
                        </label>
                        <div className="shareOption">
                            <Videocam htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Video</span>
                        </div>
                        <div className="shareOption">
                            <AttachFile htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Attachment</span>
                        </div>
                        <div className="shareOption">
                            <Mic htmlColor="purple" className="shareIcon"/>
                            <span className="shareOptionText">Audio</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share