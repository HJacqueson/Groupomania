import axios from "axios"
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import background from "../../assets/home_background_groupomania.jpg"





function Signup () {
    const { register, handleSubmit, formState: { errors },} = useForm();

    const signup = user => {
        console.log(user)
        axios.post("http://localhost:4200/api/auth/signup", user,
        {
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            alert("Nouveau Compte créé ! Veuillez vous connecter")
            window.location = "/"
            
        })
        .catch(error => {
            console.log(error);
            alert("Adresse mail déjà utilisée ! Veuillez vous connecter ou vous inscrire avec une adresse mail différente.");
        });
        
    }

    return (
        <div className="container">
            <h1 className="text-center fw-bold pt-5">Bienvenue</h1>
            <h2 className="text-center fw-light p-4">sur le réseau social de Groupomania !</h2>
            {/* <img src={logo} className="w-100" alt="Logo de Groupomania, entreprise de grande distribution européenne" /> */}
            <div className="row mb-5">
                <div className="col-4">
                    <h3>S"inscrire</h3>
                    <form onSubmit={handleSubmit(signup)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputLastName">Nom</label>
                            <input autoFocus required type="text" className="form-control" id="lastname" placeholder="Entrez votre Nom" 
                            {...register("lastname", {
                                minLength: 2,
                                maxLength: 26,
                                pattern: /[a-zA-ZÀ-ÿ]/,
                              })}
                            />
                            {errors.lastname && (
                                <p className="text-center text-danger mt-1">
                                  Le nom de famille ne doit contenir que des lettres !
                                </p>
                            )}{""}
                            <small className="form-text text-muted">Veuillez rentrer votre nom de famille</small>
                       </div>
                       <div className="form-group">
                            <label htmlFor="exampleInputLastName">Prénom</label>
                            <input required type="text" className="form-control" id="firstname" placeholder="Entrez votre Prénom" 
                            {...register("firstname", {
                                minLength: 2,
                                maxLength: 26,
                                pattern: /[a-zA-ZÀ-ÿ]/,
                              })}
                            />
                            {errors.firstname && (
                                <p className="text-center text-danger mt-1">
                                    Le prénom ne doit contenir que des lettres !
                                </p>
                            )}{""}
                            <small className="form-text text-muted">Veuillez rentrer votre prénom</small>
                       </div>
                       <div className="form-group">
                            <label htmlFor="exampleInputEmail">Adresse Mail</label>
                            <input type="email" className="form-control" id="email" placeholder="Entrez votre Email" 
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
                            <small className="form-text text-muted">Veuillez rentrer votre adresse mail</small>
                       </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Mot de Passe</label>
                            <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe" 
                            {...register("password", {
                                minLength: 8,
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/
                              })}
                            />
                            {errors.password && (
                                <p className="text-center text-danger mt-1">
                                    Le mot de passe doit contenir au moins 8 caractères avec au moins 1 majuscule 1 minuscule et 1 caractère spécial !
                                </p>
                            )}
                            <small className="form-text text-muted">Veuillez rentrer votre mot de passe</small>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" 
                        onClick={
                            (() => signup)
                        }>Connexion</button>
                    </form>
                    <p className="mt-5">Vous avez déjà compte ?</p>
                    <Link className="signup-link" to="/">
                        Se Connecter
                    </Link>
                </div>
                <div className="col-8" style={{ backgroundImage: `url(${background})` }}>
                </div>
            </div>
        </div>
    )
}

export default Signup;