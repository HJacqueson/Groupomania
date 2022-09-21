import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Signup () {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState();
    const navigate = useNavigate(); 
    const user = {lastname, firstname, email, password}

    const signup = () => {
        axios.post('http://localhost:4200/api/auth/signup', user,
                {
                    headers: {'Content-Type': 'application/json'}
                })
       
            .then(signup => {
                console.log(signup.status);
                alert('Nouveau Compte créé ! Veuillez vous connecter');
                navigate('/login')
            })
            .catch(error => {
                console.log(error);
                alert('Adresse mail déjà utilisée ! Veuillez vous connecter ou vous inscrire avec une adresse mail différente.');
            })
            navigate('/login')
    }

    const emailReg = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;

    function idValidation(email, password, firstname, lastname) {
        if (!email.match(emailReg)) {
            alert('Erreur : votre email est invalide !');
            return;
        } else if (!password.match(passwordReg)) {
            alert('Erreur : votre mot de passe est invalide !');
            return;
        } else if (firstname === '' || firstname === undefined) {
            alert(`Erreur : Vous n'avez pas entré votre prénom`);
            return;
        } else if (lastname === '' || lastname === undefined) {
            alert(`Erreur : Vous n'avez pas entré votre nom`);
            return;
        } else {
            signup();
        } 
    }

    return (
        <div className='container'>
            <h3 className='mt-5 pt-5'>Inscription</h3>
            <div className='row'>
                <div className='col-md-4 mt-4 mb-3'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='firstname'>Prénom</label>
                            <input type='text' className='form-control' id='firstname' placeholder='Prénom' 
                            onChange={(e) => {
                                setFirstname(e.target.value);
                            }}
                            ></input>
                            <small id='emailHelp' className='form-text text-muted'>champs requis</small>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='lastname'>Nom</label>
                            <input type='text' className='form-control' id='lastname' placeholder='Nom de famille'
                            onChange={(e) => {
                                setLastname(e.target.value);
                            }}
                            ></input>
                            <small id='emailHelp' className='form-text text-muted'>champs requis</small>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Adresse mail</label>
                            <input type='email' className='form-control' id='email' placeholder='Enter email'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            ></input>
                            <small id='emailHelp' className='form-text text-muted'>champs requis</small>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Mot de passe</label>
                            <input type='password' className='form-control' id='password' placeholder='Password'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            ></input>
                            <small id='emailHelp' className='form-text text-muted'>minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère.</small>
                        </div>
                        <button type='submit' className='btn btn-primary mt-3' 
                        onClick={
                            (() => signup (), () => idValidation(email, password, firstname, lastname))
                        }>Je m'inscris</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;