import {useForm} from "react-hook-form"
import axios from "axios"
import e404 from "../../assets/404.jpg"
import { useNavigate } from "react-router-dom"

function Modifypost(){
    let userId = localStorage.getItem("userId")
    let mytoken = localStorage.getItem("token")
    let postId = localStorage.getItem("postId")
    let title = localStorage.getItem("title")
    let content = localStorage.getItem("content")
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    
    const onSubmit = post => {
        console.log(post)

        const updatePost = new FormData()
        updatePost.append("image", post.imageUrl[0])
        updatePost.append("post", JSON.stringify({
            title:post.title, 
            content:post.content
        }))

        axios.put("http://localhost:4200/api/posts/"+postId, updatePost ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${mytoken}`
                }})
            .then(() => {
  
                localStorage.removeItem("postId")
                localStorage.removeItem("title")
                localStorage.removeItem("content")
                alert('Article modifié !')
                navigate("/welcome")
            })
            .catch(error => {
                console.log(error)
            });
    
    }

    return (
        userId ?
        <div className="container mt-5 pb-3">
            <div className="row p-3 m-5" style={{backgroundColor: "#FFD7D7"}}>
                <div className="col-md-5  mb-5 mt-5">
                    <h5>Modification de votre article</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="title">Titre</label>
                            <textarea type="text" rows="1" style={{resize: "none"}} className="form-control" id="title" {...register("title", { required: true })} defaultValue={title}></textarea>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="post">Article</label>
                            <textarea type="text" rows="5" style={{resize: "none"}} className="form-control" id="article" {...register("content", { required: true })} defaultValue={content}></textarea>
                            <small id="emailHelp" className="form-text text-muted">champs requis</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label" >Telecharger une photo</label>
                            <input className="form-control" type="file" {...register("imageUrl", { required: false })} id="formFile"></input>
                        </div>
                        <button type="submit" className="btn btn-dark mt-3 mb-5">Modifier</button>
                    </form>
                </div>
            </div>
        </div>
        : <div><img src={e404} className="pt-5 w-100 img-fluid" alt="error"></img></div>
    
    )
}

export default Modifypost