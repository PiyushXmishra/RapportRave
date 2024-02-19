import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import background from './240_F_416281579_t45mfWPWBlgGi9QV2KmqVem5aJfgXN9G.jpg';
import Loader from "../assets/icegif-1260.gif";

const Contacts = () => {
  const myStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserID] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [userTableVisible, setUserTableVisible] = useState<boolean>(false); // State to manage user table visibility
  const [chatVisible, setChatVisible] = useState<boolean>(false); // State to manage chat visibility

  const chatBoxRef = useRef<HTMLDivElement>(null); // Ref for chat box element

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_EXPRESS_URL}/user/bulk`);
        console.log('API Response:', response.data);
        // Filter out the currently logged-in user from the list of all users
        const loggedInUserId = localStorage.getItem('userId');
        const filteredUsers = response.data.user.filter((user: { _id: string | null; }) => user._id !== loggedInUserId);
        setUsers(filteredUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userId) {
      getChat();
      // Start long polling for new messages
      const intervalId = setInterval(getChat, 100); // Fetch every 5 seconds
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [userId]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId")
    window.location.reload();
  }

  const getChat = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_EXPRESS_URL}/messages/getmsg`, {
        from: localStorage.getItem('userId'),
        to: userId,
      });
      console.log(response.data);
      setMessages(response.data); // Scroll to bottom after receiving new messages
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleUserClick = (user: any) => {
    setUserID(user._id);
    setSelectedUser(user);
    scrollToBottom();
    setUserTableVisible(false); // Hide user table when a user is selected
    setChatVisible(true); // Show chat section when a user is selected
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_EXPRESS_URL}/messages/addmsg`, {
        from: localStorage.getItem('userId'),
        to: userId,
        message: messageInput,
      });
      console.log(response.data);
      // Add the sent message to the local state
      setMessages([...messages, { fromSelf: true, message: messageInput }]);
      // Clear the message input field
      setMessageInput('');
      scrollToBottom(); // Scroll to bottom after sending message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const toggleUserTableVisibility = () => {
    if (chatVisible) {
      setChatVisible(false); // Close chat section when showing contacts
    }
    setUserTableVisible(prevState => !prevState);
  };

  if (isLoading) {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 scale-75'>
        <img src={Loader} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div className=' text-lg sm:text-2xl md:text-3xl lg:text-4xl items-center justify-center flex h-screen text-black font-semibold'>{error}</div>;
  }

  return (
    <div className="h-screen flex relative" style={myStyle}>
      {userTableVisible && (
        <div>
          <ul className="border-2 w-max rounded-lg sm:w-52 md:w-64 h-screen overflow-y-scroll scrollbar-none ">
            {users.map((user) => (
              <li className="border-2 rounded text-xl text-white p-5" key={user._id} onClick={() => handleUserClick(user)}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="" style={{ flex: 2 }}>
        <div className="rounded-lg h-[100vh]">
          {selectedUser ? (
            <div className="p-5 pt-0 h-screen rounded-lg">
              <div className="flex justify-between text-white pb-0">
                <button className="rounded-md px-2 py-1 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 " onClick={toggleUserTableVisibility} >
                  <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">{userTableVisible ? 'Hide' : 'Show'}</span>
                </button>
                <div className='flex flex-nowrap items-center'>
                  <button onClick={logout}> Log Out</button>
                </div>
              </div>
              {chatVisible && (
                <div className='border p-5 rounded-lg pt-0 '>
                  <div className='border rounded-lg justify-center flex'>
                    <h2 className="text-white text-lg">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                  </div>
                  <div ref={chatBoxRef} className="chat-box overflow-y-scroll scrollbar-none h-[78vh] ">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex p-1 ${message.fromSelf ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs rounded-lg p-2 ${message.fromself ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                          <p >{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center ">
                    <input type="text" placeholder="Type your message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="flex-1 border rounded-l-lg p-2" />
                    <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-r-lg px-4 py-2">Send</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <section className="flex justify-center items-center h-screen">
              <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Welcome to RapportRave.
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                  Hey! What's the latest buzz? Let's chat about it.
                </p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                  <button
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 "
                    onClick={toggleUserTableVisibility}
                  >
                    Show Contacts
                    <svg
                      className="ml-2 -mr-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                  <span className="font-semibold text-gray-400 uppercase">Created by PIYUSH MISHRA</span>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
