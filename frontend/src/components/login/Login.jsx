import axios from "axios"       //import du client HTTP axios
import {Link, useNavigate} from "react-router-dom"      //import du hook navigate et de l'élément link
import {useForm} from "react-hook-form"     //import du hook de formulaire
import background from "../../assets/icon-left-font.png"        //import de l'image de background


function Login () {
    const { register, handleSubmit} = useForm()     //hook de formulaire
    const navigate = useNavigate()      //hook de navigation

    const login = user => {
        console.log(user)
        localStorage.clear()
        axios.post("http://localhost:4200/api/auth/login", user,        //requête de récupération de l'utilisateur
        {
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            localStorage.setItem("userId", res.data.userId)     //stockage des données de l'utilisateur ne mettant pas en cause la sécurité dans le local storage
            localStorage.setItem("firstname", res.data.firstname)
            localStorage.setItem("email", res.data.email)
            localStorage.setItem("lastname", res.data.lastname)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("profilePicture", res.data.profilePicture)
            navigate("/welcome")
        })
        .catch(error => {
            console.log(error)
            alert(": Veuillez créer un Compte, ou entrer un Email et un Mot de Passe correct !")
        })
        
    }
//page de connexion
    return (
        <div className="container">
            <h1 className="text-center fw-bold mt-3 mb-0 p-4 border border-bottom-0 border-secondary" style={{backgroundColor: "black", color: "white"}}>Bienvenue</h1>
            <h2 className="text-center mb-3 p-4 border border-top-0 border-secondary shadow" style={{backgroundColor: "black", color: "white"}}>sur le réseau social de Groupomania !</h2>
            <div className="row mb-5 p-5 border-top border-secondary" style={{backgroundColor: "#FFD7D7"}}>
                <div className="col-12 col-md-4">
                <h3>Connexion</h3>
                    <form onSubmit={handleSubmit(login)}>
                       <div className="form-group">
                            <label htmlFor="exampleInputEmail">Adresse Mail</label>
                            <input type="email" className="form-control" id="exampleInputEmail" placeholder="Entrez votre Email" 
                            {...register("email", { required: true })}
                            ></input>
                            <small className="form-text text-dark">Veuillez rentrer votre adresse mail</small>
                       </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Mot de Passe</label>
                            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Entrez votre mot de passe" 
                            {...register("password", { required: true })}
                            ></input>
                            <small className="form-text text-dark">Veuillez rentrer votre mot de passe</small>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" 
                        onClick={
                            (() => login)
                        }>Connexion</button>
                    </form>
                    <p className="mt-5">Vous n'avez pas de compte ?</p>
                    <Link className="signup-link text-dark" to="/signup">
                        Créer un compte
                    </Link>
                </div>
                <div className="col-0 col-md-8" style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat",
       backgroundPosition: "center"}}>
                </div>
            </div>
        </div>
    )
}

export default Login