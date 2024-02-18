import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Chat from './Components/Chat'
function App() {
  return (
    <>
<Router>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Signin" element={<Signin/>}/>
         
        
      </Routes>
    </Router>

    </>
  )
}

export default App
