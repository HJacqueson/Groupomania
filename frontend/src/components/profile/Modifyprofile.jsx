import {useForm} from "react-hook-form"
import axios from "axios"
import Deleteprofile from "./Deleteprofile"

function Modifyprofile(){
    let firstname = localStorage.getItem("firstname")
    let lastname = localStorage.getItem("lastname")
    let mytoken = localStorage.getItem("token")
    
    const { register, handleSubmit } = useForm()
    
    const onSubmit = user => {
        console.log(user.lastname)

        const profilePicture = new FormData()
        profilePicture.append("profilePicture", user.profilePicture[0])
        profilePicture.append("user", JSON.stringify(user))

        axios.put("http://localhost:4200/api/users", profilePicture ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${mytoken}`
                }})
            .then(() => {
                localStorage.setItem("firstname", user.firstname)
                localStorage.setItem("lastname", user.lastname)
                localStorage.setItem("profilePicture",user.profilePicture)
                window.location="/welcome"
            })
            .catch(error => console.log(error))

    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-5">
                        <h5>Modification de vos données</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input type="text" className="form-control" id="name1" {...register("lastname", { required: true })}  placeholder={lastname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Prénom</label>
                                <input type="text" className="form-control" id="lastname1" {...register("firstname", { required: true })}  placeholder={firstname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email1" {...register("email", { required: true })}  placeholder="*****@*******"></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" className="form-control" id="password1" {...register("password", { required: true })} placeholder="********"></input>
                                <small id="emailHelp" className="form-text text-muted">minimum 8 caractères avec au moins 1 majuscule 1 minuscule 1 caractère.</small>
                            </div>
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