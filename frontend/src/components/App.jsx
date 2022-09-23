import '../App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Banner from './banner/Banner'
import Banner2 from './banner/Banner2'
import Banner3 from './banner/Banner3'
import Banner4 from './banner/Banner4'
import Banner5 from './banner/Banner5'
import Banner6 from './banner/Banner6'

import Home from './home/Home'
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
                <Route path='/' element={<Banner />} />
                <Route path='/login' element={<Banner2 />} />
                <Route path='/signup' element={<Banner3 />} />
                <Route path='/welcome' element={<Banner4 />} />
                <Route path='/profile' element={<Banner5 />} />
                <Route path='/logout' element={<Banner6 />} />
            </Routes>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/welcome' element={<Welcome />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/post' element={<Post />} />
            </Routes>
        </Router>
    )
}

export default App