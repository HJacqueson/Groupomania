import { useNavigate } from "react-router-dom"
import e404 from "../../assets/404.jpg"
import logo from "../../assets/icon-left-font.png"


function Profile(){
    let userId = localStorage.getItem("userId")
    let firstname = localStorage.getItem("firstname")
    let lastname = localStorage.getItem("lastname")
    let profilePicture = localStorage.getItem("profilePicture")
    const navigate = useNavigate()
    
    return (
        userId ?
        <div className ="container p-0 m-0">
            <div className="row mt-5 d-flex flex-row justify-content-between" style={{backgroundColor: "#FFD7D7"}}>
                <div className="col-12 col-md-6 m-5 mb-0 rounded-circle overflow-hidden shadow p-0" style={{width: "100px", height: "100px"}}>
                    <img className="bg-light pl-0 h-100" alt="portrait" src={profilePicture} ></img>
                    
                </div>
                <div className="col-0 col-md-6">
                    <img className="mt-5 w-75 d-block mx-auto" alt="logo" src={logo} ></img>
                </div>
                <h4 className="p-5 pt-3 pb-0">Bonjour {firstname} {lastname}</h4>
            </div>
            <div className="row">
                <div className="btn-toolbar justify-content-center">
                    <button onClick={() =>{ navigate("/post")}} type="submit" className="shadow-lg btn btn-dark mt-5 mx-5">Poster un article</button>                
                    <button onClick={() =>{ navigate("/modifyprofile")}} type="submit" className="shadow-lg btn btn-dark mt-5">Modifier mon profil</button>
                </div>
            </div>        
        </div>  
        : <div><img src={e404} className="mb-5 img-fluid" alt="error"></img></div>
    )
}

export default Profile

