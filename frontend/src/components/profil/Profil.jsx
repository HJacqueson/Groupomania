import { useNavigate } from 'react-router-dom';

import e404 from '../../assets/404.jpg'

function Profil(){
    let userfirstname = localStorage.getItem("userfirstname");
    let username = localStorage.getItem("username");
    let profilePicture = localStorage.getItem("profilePicture");
    const navigate = useNavigate(); 
    

    return (
        userfirstname ? <div className="mt-3 card profil">
        <div className="flexprofil">
            <div className='imgcroper  mt-3'>
                <img className="imgProfil" alt='profil de profil' src={profilePicture} ></img>
            </div>
            <h5 className="name">Bonjour {userfirstname} {username}</h5>
        </div>
        <div>
            <div><button onClick={() =>{ navigate('/post')}} type="submit" className="btn btn-dark mt-3 ml-1">Poster un article</button></div>
            <div><button onClick={() =>{ navigate('/modifyprofil')}} type="submit" className="btn btn-dark mt-2 mb-3">Modifier mon profil</button></div>
        </div>
    </div> : <div><img src={e404} className="mb-5 img-fluid" alt="error"></img></div>
    )
}

export default Profil