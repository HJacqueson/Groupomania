import { useNavigate } from "react-router-dom"      //import du hook de navigation
import {useForm} from"react-hook-form"      //import du hook de formulaire
import axios from"axios"        //import du client HTTP axios

function Deleteprofile(){
    let userId = localStorage.getItem("userId")     //récupération des données utiles de l'utilsateur dans le local storage     
    let mytoken = localStorage.getItem("token") 

    const { register, handleSubmit } = useForm()        //hook de formulaire
    const navigate = useNavigate()

    const onSubmit = user => {
        console.log(user)
        axios.post("http://localhost:4200/api/auth/login", user,        //requête de connexion d'utilisateur
        {
            headers: {"Content-Type":"application/json"}
        })
        .then(res => {
            console.log(res.data)
            console.log(res.data.userId)
            if(res.data.userId === userId){
                axios.delete("http://localhost:4200/api/users/"+userId, {       //requête de suppression de compte d'utilisateur
                    headers: {"Authorization": `Bearer ${mytoken}`}
                })
                    .then(() => {
                        alert(`Votre compte a bien été supprimé, nous espérons vous revoir très bientôt, vous allez être redirigé vers la page d'inscription`) 
                        localStorage.clear()
                        navigate("/signup")     //redirection vers la page d'inscription
                    })
                    .catch(error => {
                        console.log(error)
                    })
    
            } else {
                alert("L'adresse mail ou le mot de passe semble incorrect")
            }
        })
        .catch(error => {
            console.log(error)
            alert("L'adresse mail ou le mot de passe semble incorrect")
        })    
    }
//composant de suppression de compte utilisateur
    return (
        <div>
            <div className="offset-md-2 mb-5 mt-5">
                <h5>Supprimer le compte</h5>
                <p>Attention cette action est irréversible !</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail">Adresse Mail</label>
                        <input type="email" className="form-control" id="exampleInputEmail" placeholder="Entrez votre Email" 
                        {...register("email", { required: true })} 
                        ></input>
                        <small className="form-text text-dark">Veuillez rentrer votre adresse mail</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword">Mot de passe</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Entrez votre mot de passe"
                        {...register("password", { required: true })}
                        ></input>
                        <small className="form-text text-dark">Veuillez rentrer votre mot de passe</small>
                    </div>
                    <button type="submit" className="btn btn-danger mt-2 mb-3">Supprimer mon compte</button>
                </form>
            </div>
        </div>
    )
}

export default Deleteprofile