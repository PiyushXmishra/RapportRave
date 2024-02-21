import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../Firebase';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function OAuth() {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
    
            const result = await signInWithPopup(auth, provider);
    
            // Post user data to your backend
            const res = await axios.post(`${import.meta.env.VITE_EXPRESS_URL}/auth/google`, {
                firstname: result.user.displayName,
                email: result.user.email,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Response from backend:", res.data);

            navigate('/');
        } catch (error) {
            console.error("Error signing in with Google or sending data to backend:", error);
        }
    }
    

    return (
        <button id='oauth'
            onClick={handleGoogleClick}
            type="submit"
            className="w-full py-3 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-900 transition-all duration-300 ease-in-out focus:outline-none focus:shadow-outline"
        >
            Continue With Google
        </button>
    );
}

export default OAuth;
