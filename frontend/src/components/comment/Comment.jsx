import {useForm} from "react-hook-form"
import {useState, useEffect} from "react"
import axios from "axios"
import Deletecomment from "./Deletecomment.jsx"


function Comment ({postId}) {
const [isOpen, setIsOpen] = useState(false)
const [comments, setComments] = useState()
const { register, handleSubmit, reset} = useForm()
let mytoken = localStorage.getItem("token")
let userId = localStorage.getItem("userId")
let firstname = localStorage.getItem("firstname")
let lastname = localStorage.getItem("lastname")


const onSubmit = comment => {
    comment.postId = postId
    console.log(comment)
    axios.post("http://localhost:4200/api/comments", comment,
    {
        headers: {"Authorization": `Bearer ${mytoken}` }
    })
    .then( res => {
        reset()
        let postComments = [...comments]
        postComments.push(res.data)
        setComments(postComments)
        console.log(res.status)
    })
}

useEffect(() => {
    axios.get("http://localhost:4200/api/comments", {
        headers:{
            "Authorization": `Bearer ${mytoken}`
        }
    })
    .then(res => {
        setComments(res.data);  
    })
    .catch(error => console.log(error))
}, [])

const deleteComment = commentId => {
    let newComments = [...comments]
    newComments = newComments.filter(comment => comment.id !== commentId)
    setComments(newComments)
} 
return (  
    <div>
        <button onClick={isOpen ? () => setIsOpen(false) : () => setIsOpen(true)} className="btn btn-dark mr-2 mt-2">Commenter</button>
    {   
        isOpen ? 
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>
                    {
                        comments && comments.map(comment => (
                            <div key={comment.id}>
                                {postId === comment.postId ? (<div className="comment">
                                {userId === comment.userId ? <div className="date"><Deletecomment commentId={comment.id} delComments={deleteComment} /></div> : false}
                                    <h6 className="auth">{firstname} {lastname}:</h6>
                                <p>{comment.content} <br></br>
                                <span className="date">posté le {comment.createdAt.split("T")[0].split(".")[0]} à {comment.createdAt.split("T")[1].split(".")[0]}</span>
                                </p>
                                </div>):false}
                            </div>
                        ))
                    }
                </span>
                <div className="form-group">
                    <label htmlFor="comment"></label>
                    <textarea type="text"  className="form-control" {...register("content", { required: true })} id="comment" placeholder="Votre commentaire..."></textarea>
                    <button type="submit" className="btn btn-primary mt-3">Poster</button>
                </div>
            </form> : false
    }  
    </div>
)
}


export default Comment