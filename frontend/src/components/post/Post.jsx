import {useForm} from "react-hook-form"
import axios from "axios"
import e404 from "../../assets/404.jpg"


function Post() {
    let userId = localStorage.getItem("userId")
    const { register, handleSubmit } = useForm()
    let mytoken = localStorage.getItem("token")
    let firstname = localStorage.getItem("firstname")
    console.log(firstname)
    let lastname = localStorage.getItem("lastname")

    const onSubmit = post => {
        console.log(post.imageUrl)
        const newPost = new FormData()
        newPost.append("image", post.imageUrl[0])
        newPost.append("post", JSON.stringify({content:post.content, title:post.title, firstname:firstname, lastname:lastname}))
        console.log(post)
        axios.post("http://localhost:4200/api/posts", newPost,
            {
                headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${mytoken}` }
            })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            alert("Nouvel article créé !")
            window.location="/welcome"
        })
        .catch(error => {
            console.log(error)
        })   
    }

    return (
        userId ?
        <div className="container">            
            <div className="row p-3" style={{backgroundColor: "#FFD7D7"}}>
                <h3 className="mt-5 pt-5">Ajouter un article</h3>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Titre</label>
                            <input type="text" className="form-control" id="title" {...register("title", { required: true })}  placeholder="Titre de l'article"></input>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Article</label>
                            <textarea type="text" rows="5" style={{resize: "none"}} className="form-control" id="article" {...register("content", { required: true })}  placeholder="Votre article ici"></textarea>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
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