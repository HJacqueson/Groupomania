import '../App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Banner from './banner/Banner'

import Signup from './signup/Signup'
import Login from './login/Login'
import Welcome from './welcome/Welcome'
import Profile from './profile/Profile'
import Logout from './logout/Logout'
import Post from './post/Post'


function App() {
    return(
        <Router>
            <Routes>
                <Route path='/welcome' element={<Banner />} />
                <Route path='/profile' element={<Banner />} />
                <Route path='/logout' element={<Banner />} />
            </Routes>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/welcome' element={<Welcome />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/post' element={<Post />} />
            </Routes>
        </Router>
    )
}

export default App