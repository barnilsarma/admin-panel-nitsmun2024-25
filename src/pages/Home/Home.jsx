import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import { auth, provider } from "../../config";
import { signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
const Home = () => {
    const [val, setVal] = useState("");
    const handleSout = () => {
        localStorage.removeItem("email");
        useEffect(() => {
            setVal("");
        }, []);
    }
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            if (data.user && data.user.email) {
                const userEmail = data.user.email.toLowerCase();
                if (userEmail === import.meta.env.VITE_MOD1.toLowerCase() ||
                    userEmail === import.meta.env.VITE_MOD2.toLowerCase()) {
                    setVal(userEmail);
                    localStorage.setItem("email", userEmail);
                } else {
                    toast.error("User email does not match authorized moderators.");
                }
            } else {
                console.error("Error retrieving user data during sign-in.");
            }
        }
        );
    }
    useEffect(() => {
        setVal(localStorage.getItem("email"));
    });
    return (
        <div className={styles.home}>
            {val ?
                <>
                    <button onClick={handleSout}>Signout</button>
                    <Link to='/blogs'>Blogs</Link>
                </>
                : <button onClick={handleClick}>
                    Sign in with google
                </button>
            }
            <Toaster />
        </div>
    );
}
export default Home;