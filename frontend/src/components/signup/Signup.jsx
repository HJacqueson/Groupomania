import axios from "axios"       //import du client HTTP axios
import {useForm} from "react-hook-form"     //import du hook de formulaire
import {Link, useNavigate} from "react-router-dom"      //import du hook de navigation et de l'élément link
import background from "../../assets/icon-left-font.png"        //import de l'image de background





function Signup () {
    const { register, handleSubmit, formState: { errors },} = useForm()     //hook de formulaire
    const navigate = useNavigate()      //hook de navigation

    const signup = user => {
        console.log(user)
        axios.post("http://localhost:4200/api/auth/signup", user,       //requête dinscription d'utilisateur
        {
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            alert("Nouveau Compte créé ! Veuillez vous connecter")
            navigate("/")       //redirection vers la page de connexion
            
        })
        .catch(error => {
            console.log(error)
            alert("Adresse mail déjà utilisée ! Veuillez vous connecter ou vous inscrire avec une adresse mail différente.")
        })
        
    }
//page d'inscription
    return (
        <div className="container">
            <h1 className="text-center fw-bold mt-3 mb-0 p-4 border border-bottom-0 border-secondary" style={{backgroundColor: "black", color: "white"}}>Bienvenue</h1>
            <h2 className="text-center mb-3 p-4 border border-top-0 border-secondary shadow" style={{backgroundColor: "black", color: "white"}}>sur le réseau social de Groupomania !</h2>
            <div className="row mb-5 p-5 border-top border-secondary" style={{backgroundColor: "#FFD7D7"}}>
                <div className="col-12 col-md-4 pb-5">
                    <h3>S'inscrire</h3>
                    <form onSubmit={handleSubmit(signup)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputLastName">Nom</label>
                            <input autoFocus required type="text" className="form-control" id="exampleInputLastName" placeholder="Entrez votre Nom" 
                            {...register("lastname", {
                                minLength: 2,
                                maxLength: 26,
                                pattern: /[a-zA-ZÀ-ÿ]/,
                              })}
                            />
                            {errors.lastname && (
                                <p className="text-center text-danger mt-1">
                                  Le nom de famille ne doit contenir que des lettres et deux caractères minimum !
                                </p>
                            )}{""}
                            <small className="form-text text-dark">Veuillez rentrer votre nom de famille</small>
                       </div>
                       <div className="form-group">
                            <label htmlFor="exampleInputLastName">Prénom</label>
                            <input required type="text" className="form-control" id="exampleInputLastName" placeholder="Entrez votre Prénom" 
                            {...register("firstname", {
                                minLength: 2,
                                maxLength: 26,
                                pattern: /[a-zA-ZÀ-ÿ]/,
                              })}
                            />
                            {errors.firstname && (
                                <p className="text-center text-danger mt-1">
                                    Le prénom ne doit contenir que des lettres et deux caractères minimum !
                                </p>
                            )}{""}
                            <small className="form-text text-dark">Veuillez rentrer votre prénom</small>
                       </div>
                       <div className="form-group">
                            <label htmlFor="exampleInputEmail">Adresse Mail</label>
                            <input type="email" className="form-control" id="exampleInputEmail" placeholder="Entrez votre Email" 
                            {...register("email", {
                                minLength: 5,
                                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
                              })}
                            />
                            {errors.email && (
                                <p className="text-center text-danger mt-1">
                                    Entrer une adresse email valide !
                                </p>
                            )}
                            <small className="form-text text-dark">Veuillez rentrer votre adresse mail</small>
                       </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Mot de Passe</label>
                            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Entrez votre mot de passe" 
                            {...register("password", {
                                minLength: 8,
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/
                              })}
                            />
                            {errors.password && (
                                <p className="text-center text-danger mt-1">
                                    Le mot de passe doit contenir au moins 8 caractères avec au moins 1 majuscule, 1 minuscule, 1 caractère spécial et 2 chiffres !
                                </p>
                            )}
                            <small className="form-text text-dark">Veuillez rentrer votre mot de passe</small>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" 
                        onClick={
                            (() => signup)
                        }>Créer son compte</button>
                    </form>
                    <p className="mt-5">Vous avez déjà compte ?</p>
                    <Link className="signup-link text-dark" to="/">
                        Se Connecter
                    </Link>
                </div>
                <div className="col-0 col-md-8" style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat",
       backgroundPosition: "center"}}>
                </div>
            </div>
        </div>
    )
}

export default Signup