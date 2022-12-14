import { useNavigate } from "react-router-dom"      //import du hook de navigation
import e404 from "../../assets/404.jpg"     //import de l'image d'erreur 404
import logo from "../../assets/icon-left-font.png"      //import du logo

function Logout(){
    let userId = localStorage.getItem("userId")     //récupération des données utiles de l'utilsateur dans le local storage
    let firstname = localStorage.getItem("firstname")
    let lastname = localStorage.getItem("lastname")
    let profilePicture = localStorage.getItem("profilePicture")
    
    const navigate = useNavigate()      //hook de navigation
    
    const cleardata = () => {
        localStorage.clear()        //suppresion du local storage
        navigate("/") 
    }
//page de déconnexion
    return (
        userId ? 
        <div className ="container">
            <div className="row mt-5 d-flex flex-row justify-content-between" style={{backgroundColor: "#FFD7D7"}}>
                <div className="col-12 col-md-6 m-5 mb-0 rounded-circle overflow-hidden shadow p-0" style={{width: "100px", height: "100px"}}>
                    <img className="bg-light pl-0 h-100" alt="portrait" src={profilePicture} ></img>
                    
                </div>
                <div className="col-0 col-md-6">
                    <img className="mt-5 w-75 d-block mx-auto" alt="logo" src={logo} ></img>
                </div>
                <h4 className="p-5 pt-3 pb-0">{firstname} {lastname}, êtes vous sûr de vouloir vous déconnecter ?</h4>
            </div>
            
            <div className="row">
                <div className="btn-toolbar justify-content-center">
                    <button onClick={() => cleardata ()} type="submit" className="btn btn-dark mt-5 mx-5">Oui</button>
                    <button onClick={() => { navigate("/welcome")}} type="submit" className="btn btn-dark mt-5 mx-5">Non</button>
                </div>
            </div>        
        </div>  
        : <div><img src={e404} className="pt-5 w-100 img-fluid" alt="error"></img></div>
    )
}

export default Logout