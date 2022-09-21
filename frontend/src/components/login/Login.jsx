import axios from 'axios';
// import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';



function Login (props) {
    const { register, handleSubmit} = useForm();

    const login = user => {
        console.log(user)
        axios.post('http://localhost:4200/api/auth/login', user,
        {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('role', res.data.role)
            localStorage.setItem('token', res.data.token)
            window.location = '/welcome'
            
        })
        .catch(error => {
            console.log(error);
           
            alert(": Veuillez créer un Compte, ou entrer un Email et un Mot de Passe correct !")
        });
        
    }
    
    // const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;

    // function emailValidation(email, password) {
    //     // if (!email.match(emailReg)) {
    //     //     alert("erreur : Votre email est invalide !");
    //     //     return;
    //     // }else if (!password.match(passwordReg)) {
    //     //     alert('Erreur : votre mot de passe est invalide !');
    //     //     return;
    //     // }else{
    //         login();
    //     // } 
    // }

    return (
        <div className='container'>
            <h3 className='mt-5 pt-5'>Connexion</h3>
            <div className='row mb-5'>
                <div className='col-4 mt-5'>
                    <form onSubmit={handleSubmit(login)}>
                       <div className='form-group'>
                            <label htmlFor='exampleInputEmail'>Adresse Mail</label>
                            <input type='email' className='form-control' id='email' placeholder='Entrez votre Email' 
                            {...register("email", { required: true })}
                            ></input>
                            <small className='form-text text-muted'>Veuillez rentrer votre adresse mail</small>
                       </div>
                        <div className='form-group'>
                            <label htmlFor='exampleInputPassword'>Mot de Passe</label>
                            <input type='password' className='form-control' id='password' placeholder='Entrez votre mot de passe' 
                            {...register("password", { required: true })}
                            ></input>
                            <small className='form-text text-muted'>Veuillez rentrer votre mot de passe</small>
                        </div>
                        <button type='submit' className='btn btn-primary mt-3' 
                        onClick={
                            (() => login/*, () => emailValidation(email, password)*/)
                        }>Connexion</button>
                    </form>
                    <p className='mt-5'>Vous n'avez pas de compte ?</p>
                    <Link className="signup-link" to="/signup">
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;