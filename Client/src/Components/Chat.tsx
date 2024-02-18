import { useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "./Contacts";
const Chat = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const fetchData = async () => {
            const localStorageKey = "jwtToken";
            if (!localStorage.getItem(localStorageKey)) {
                navigate("/signin");
            } else {
                const userDataString = localStorage.getItem("jwtToken") || "{}";
                setCurrentUser(JSON.parse(userDataString));
            }
        };

        fetchData();

    }, [navigate]);

    return (
        <div>

<Contacts/>
        </div>
    );
}
export default Chat


