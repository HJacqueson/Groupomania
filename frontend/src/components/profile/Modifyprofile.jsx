import {useForm} from "react-hook-form"
import axios from "axios"
import Deleteprofile from "./Deleteprofile"

function Modifyprofile(){
    let firstname = localStorage.getItem("firstname")
    let lastname = localStorage.getItem("lastname")
    let userId = localStorage.getItem("userId")
    let mytoken = localStorage.getItem("token")
    
    const { register, handleSubmit } = useForm()
    
    const onSubmit = user => {
        console.log(user)

        const updateProfile = new FormData()
        updateProfile.append("image", user.profilePicture[0])
        updateProfile.append("user", JSON.stringify({
            lastname:user.lastname, 
            firstname:user.firstname, 
            role:user.role 
        }))

        axios.put("http://localhost:4200/api/users/"+userId, updateProfile ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${mytoken}`
                }})
            .then(() => {
                axios.get("http://localhost:4200/api/users/"+userId, {
                    headers: { "Authorization": `Bearer ${mytoken}`}
                    })
                    .then((res) => {
                        console.log(res.data)
                        localStorage.setItem("firstname", user.firstname)
                        localStorage.setItem("lastname", user.lastname)
                        localStorage.setItem("profilePicture", res.data.profilePicture)
                        window.location="/welcome"
                    })
                    .catch(error => console.log(error))
                
            })
            .catch(error => {
                console.log(error)
                alert(": Cet email semble déjà utilisé !")
                window.location.reload()
            });
    
    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row modidel">
                    <div className="col-md-6 mb-5">
                        <h5>Modification de vos données</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input type="text" className="form-control" id="lastname" {...register("lastname", { required: true })}  placeholder={lastname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Prénom</label>
                                <input type="text" className="form-control" id="firstname" {...register("firstname", { required: true })}  placeholder={firstname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Rôle</label>
                                <input type="text" className="form-control" id="role" {...register("role", { required: true })}  placeholder={firstname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email1" {...register("email", { required: true })}  placeholder="*****@*******"></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" className="form-control" id="password1" {...register("password", { required: true })} placeholder="********"></input>
                                <small id="emailHelp" className="form-text text-muted">minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère.</small>
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label" >Photo de profil</label>
                                <input className="form-control" type="file" {...register("profilePicture", { required: false })} id="formFile"></input>
                            </div>
                            <button type="submit" className="btn btn-warning mt-3">Modifier mon profil</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <Deleteprofile/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modifyprofile