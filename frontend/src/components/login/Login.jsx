import axios from "axios"
import {Link} from "react-router-dom"
import {useForm} from "react-hook-form"
import background from "../../assets/icon-left-font.png"


function Login () {
    const { register, handleSubmit} = useForm()

    const login = user => {
        console.log(user)
        localStorage.clear()
        axios.post(`${process.env.REACT_APP_API}/auth/login`, user,
        {
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            localStorage.setItem("userId", res.data.userId)
            localStorage.setItem("firstname", res.data.firstname)
            localStorage.setItem("email", res.data.email)
            localStorage.setItem("lastname", res.data.lastname)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("profilePicture", res.data.profilePicture)
            window.location = "/welcome"
        })
        .catch(error => {
            console.log(error)
            alert(": Veuillez créer un Compte, ou entrer un Email et un Mot de Passe correct !")
        });
        
    }
    
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
                            <input type="email" className="form-control" id="email" placeholder="Entrez votre Email" 
                            {...register("email", { required: true })}
                            ></input>
                            <small className="form-text text-muted">Veuillez rentrer votre adresse mail</small>
                       </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Mot de Passe</label>
                            <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" 
                            {...register("password", { required: true })}
                            ></input>
                            <small className="form-text text-muted">Veuillez rentrer votre mot de passe</small>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" 
                        onClick={
                            (() => login)
                        }>Connexion</button>
                    </form>
                    <p className="mt-5">Vous n'avez pas de compte ?</p>
                    <Link className="signup-link" to="/signup">
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

export default Login;