import { useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form"
import axios from "axios"
import Deleteprofile from "./Deleteprofile"
import e404 from "../../assets/404.jpg"


function Modifyprofile(){
    let firstname = localStorage.getItem("firstname")
    let lastname = localStorage.getItem("lastname")
    let userId = localStorage.getItem("userId")
    let mytoken = localStorage.getItem("token")
    
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    
    const onSubmit = user => {
        console.log(user)

        const updateProfile = new FormData()
        updateProfile.append("image", user.profilePicture[0])
        updateProfile.append("user", JSON.stringify({
            firstname:user.firstname, 
            lastname:user.lastname, 
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
                        alert("Votre profil a bien été modifié !")
                        navigate("/welcome")
                    })
                    .catch(error => console.log(error))
                
            })
            .catch(error => {
                console.log(error)
            });
    
    }


    return (
        userId ?
        <div>
            <div className="container mt-5 pb-3">
                <div className="row p-3 m-5" style={{backgroundColor: "#FFD7D7"}}>
                    <div className="col-md-5  mb-5 mt-5">
                        <h5>Modification de vos données</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input type="text" className="form-control" id="lastname" {...register("lastname", { required: true })}  defaultValue={lastname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Prénom</label>
                                <input type="text" className="form-control" id="firstname" {...register("firstname", { required: true })}  defaultValue={firstname}></input>
                                <small id="emailHelp" className="form-text text-muted">champs requis</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label" >Photo de profil</label>
                                <input className="form-control" type="file" {...register("profilePicture", { required: false })} id="formFile"></input>
                            </div>
                            <button type="submit" className="btn btn-dark mt-3">Modifier mon profil</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <Deleteprofile/>
                    </div>
                </div>
            </div>
        </div>
        : <div><img src={e404} className="pt-5 w-100 img-fluid" alt="error"></img></div>

    )
}

export default Modifyprofile