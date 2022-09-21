import '../App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Banner from './banner/Banner'
import Banner2 from './banner/Banner2'
import Banner3 from './banner/Banner3'

import Home from './home/Home'
import Signup from './signup/Signup';
import Login from './login/Login'
import Welcome from './welcome/Welcome'


function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Banner />} />
                <Route path='/login' element={<Banner2 />} />
                <Route path='/signup' element={<Banner3 />} />
            </Routes>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/welcome' element={<Welcome />} />
            </Routes>
        </Router>
    )
}

export default App;