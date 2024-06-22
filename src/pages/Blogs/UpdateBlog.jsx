import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { toast, Toaster } from "sonner";
import styles from "./Upload.module.scss";

const UpdateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [loading, setLoading] = useState("");
    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading("Loading");
        async function upd() {
            try {
                const upd = await axios.patch(`${import.meta.env.VITE_API}/blog/update/${id}`, {
                    name: name ? name.trim() : undefined, url: url ? url.trim() : undefined, thumbnail: thumbnail ? thumbnail.trim() : undefined
                });
                if (upd) {
                    toast.success("Successfully updated!!");
                    setLoading("");
                    navigate(`/blogs/${id}`);
                }
            }
            catch (err) {
                toast.error(err);
            }
        }
        upd();
    }
    return (
        <div className={styles.wrapper}>
            <Link to='/'>Home</Link>
            <Link to='/blogs'>Blogs</Link>
            <form className={styles.form}>
                <input type="text" className={styles.textbox} placeholder="New Blog Title (optional)" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="text" className={styles.textbox} placeholder="New Blog Url (optional)" onChange={(e) => setUrl(e.target.value)} value={url} />
                <div className={styles.thumbCont}>
                    <h6>Thumbnail(within 40kb)</h6>
                    <FileBase64 type="file" multiple={false} onDone={({ base64, file }) => {
                        if ((file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/webp" || file.type === "image/avif") && file.size <= 40 * 1024) {
                            setThumbnail(base64);
                        }
                        else {
                            toast.error("Invalid file type or file size exceed!!");
                            setThumbnail("");
                        }
                    }} />
                </div>
                <button onClick={handleUpdate} className={styles.subBtn}>Update</button>
                <h1>{loading}</h1>
                <Toaster />
            </form>
        </div>
    );
}
export default UpdateBlog;