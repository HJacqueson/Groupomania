import "../App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Banner from "./banner/Banner"

import Signup from "./signup/Signup"
import Login from "./login/Login"
import Welcome from "./welcome/Welcome"
import Profile from "./profile/Profile"
import Logout from "./logout/Logout"
import Post from "./post/Post"
import Footer from "./footer/Footer"
import Modifyprofile from "./profile/Modifyprofile"


function App() {
    return(
        <Router>
            <Routes>
                <Route path="/welcome" element={<Banner />} />
                <Route path="/profile" element={<Banner />} />
                <Route path="/logout" element={<Banner />} />
                <Route path="/post" element={<Banner />} />
                <Route path="/modifyprofile" element={<Banner />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/post" element={<Post />} />
                <Route path="/modifyprofile" element={<Modifyprofile />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Footer />} />
                <Route path="/signup" element={<Footer />} />
                <Route path="/welcome" element={<Footer />} />
                <Route path="/profile" element={<Footer />} />
                <Route path="/logout" element={<Footer />} />
                <Route path="/post" element={<Footer />} />
            </Routes>
        </Router>
    )
}

export default App