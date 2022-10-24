import {useForm} from "react-hook-form"     //import du hook de formulaire
import axios from "axios"       //import du client HTTP axios
import e404 from "../../assets/404.jpg"     //import de l'image d'erreur 404


function Post() {
    let userId = localStorage.getItem("userId")     //récupération des données utiles de l'utilsateur dans le local storage
    let mytoken = localStorage.getItem("token")
    let firstname = localStorage.getItem("firstname")
    let lastname = localStorage.getItem("lastname")

    const { register, handleSubmit, reset } = useForm()     //hook de formulaire

    const onSubmit = post => {
        console.log(post.imageUrl)
        const newPost = new FormData()
        newPost.append("image", post.imageUrl[0])
        newPost.append("post", JSON.stringify({content:post.content, title:post.title, firstname:firstname, lastname:lastname}))
        console.log(post)
        axios.post("http://localhost:4200/api/posts", newPost,      //requête de création d'article
            {
                headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${mytoken}` }
            })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            alert("Nouvel article créé !")
            reset()     //reset de la page courante
        })
        .catch(error => {
            console.log(error)
        })   
    }
//page de création d'article
    return (
        userId ?
        <div className="container">            
            <div className="row p-3" style={{backgroundColor: "#FFD7D7"}}>
                <h3 className="mt-5 pt-5">Ajouter un article</h3>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <input type="text" className="form-control" id="title" {...register("title", { required: true })}  placeholder="Titre de l'article"></input>
                            <small className="form-text text-dark">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post">Article</label>
                            <textarea type="text" rows="5" style={{resize: "none"}} className="form-control" id="post" {...register("content", { required: true })}  placeholder="Votre article ici"></textarea>
                            <small className="form-text text-dark">champs requis</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label" >Telecharger une photo</label>
                            <input className="form-control" type="file" {...register("imageUrl", { required: false })} id="formFile"></input>
                        </div>
                        <button type="submit" className="btn btn-dark mt-3 mb-5">Poster</button>
                    </form>
                </div>
            </div>
        </div>
        : <div><img src={e404} className="pt-5 w-100 img-fluid" alt="error"></img></div>

    )
}

export default Post