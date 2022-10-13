import {useForm} from"react-hook-form" 
import axios from"axios" 

function Deleteprofile(){
    let userId = localStorage.getItem("userId")
    let mytoken = localStorage.getItem("token") 
    const { register, handleSubmit } = useForm() 

    const onSubmit = user => {
        console.log(user)
        axios.post("http://localhost:4200/api/auth/login", user,
        {
            headers: {"Content-Type":"application/json"}
        })
        .then(res => {
            console.log(res.status)
            axios.delete("http://localhost:4200/api/users/"+userId, {
                headers: {"Authorization": `Bearer ${mytoken}`}
            })
                .then(() => {
                    alert(`Votre compte a bien été supprimé, nous espérons vous revoir très bientôt, vous allez être redirigé vers la page d"inscription`) 
                    localStorage.clear()
                    window.location ="/signup"
                })
                .catch(error => {
                    console.log(error)
                })
        })    
    }

    return (
        <div>
            <div className="offset-md-2 mb-5 mt-5">
                <h5>Supprimer le compte</h5>
                <p>Attention cette action est irréversible !</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail">Adresse Mail</label>
                        <input type="email" className="form-control" id="email" placeholder="Entrez votre Email" 
                        {...register("email", { required: true })} 
                        ></input>
                        <small className="form-text text-muted">Veuillez rentrer votre adresse mail</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword">Mot de passe</label>
                        <input type="password" className="form-control" id="password" placeholder="Entrez votre mot de passe"
                        {...register("password", { required: true })}
                        ></input>
                        <small className="form-text text-muted">Veuillez rentrer votre mot de passe</small>
                    </div>
                    <button type="submit" className="btn btn-danger mt-2 mb-3">Supprimer mon compte</button>
                </form>
            </div>
        </div>
    )
}

export default Deleteprofile