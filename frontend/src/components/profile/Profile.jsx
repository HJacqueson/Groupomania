import { useNavigate } from 'react-router-dom'
import e404 from '../../assets/404.jpg'

function Profile(){
    let userId = localStorage.getItem('userId')
    let firstname = localStorage.getItem('firstname')
    let lastname = localStorage.getItem('lastname')
    let profilePicture = localStorage.getItem('profilePicture')
    const navigate = useNavigate()
    
    return (
        userId ? 
        <div className ='container'>
            <div className='row mt-5 card profil'>
                <div className='col-10 mt-3'>
                    <img className='imgProfil' alt='portrait' src={profilePicture} ></img>
                </div>
                <h4 className='name'>Bonjour {firstname} {lastname}</h4>
            </div>
            <div className='row'>
                <div className='col-2'><button onClick={() =>{ navigate('/post')}} type='submit' className='btn btn-light mt-5'>Poster un article</button></div>
                <div className='col-2'><button onClick={() =>{ navigate('/modifyprofil')}} type='submit' className='btn btn-light mt-5'>Modifier mon profil</button></div>
            </div>        
        </div>  
        : <div><img src={e404} className='mb-5 img-fluid' alt='error'></img></div>
    )
}

export default Profile

