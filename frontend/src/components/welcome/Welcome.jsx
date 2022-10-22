import axios from "axios"       //import du client HTTP axios
import {useState, useEffect} from "react"       //import du hook d'état et du hook d'effet
import Profil from "../profile/Profile"     //import du composant de profil
import Deletepost from "../post/Deletepost"     //import du composant de suppression d'article
import Badge from 'react-bootstrap/Badge'       //import de l'élément Badge
import { useNavigate } from "react-router-dom"      //import du hook de navigation
import e404 from "../../assets/404.jpg"     //import de l'image d'erreur 404



function Welcome(props) {
    let mytoken = localStorage.getItem("token")     //récupération des données utiles de l'utilsateur dans le local storage
    let userId = localStorage.getItem("userId")
    let role = localStorage.getItem("role")
    
    const [items, setItems] = useState()        //hook d'obtention d'articles
    const [delItem, setDelitem] = useState(0)       //hook de suppression d'articles
    const [like, setLike] = useState()      //hook de likes
    const navigate = useNavigate()      //hook de navigation
    
 
    useEffect(() => {
        axios.get("http://localhost:4200/api/posts", {      //requête d'obtention de tous les posts
            headers:{
                "Authorization": `Bearer ${mytoken}`
            }
        })
        .then(res => {
            console.log(res.status)
            console.log(res.data)
            setItems(res.data)
        })
        .catch(error => console.log(error))
    },[mytoken, delItem, like])
  
    const deleteItem = postId => {      //suppression d'article
        let newItems = [...items]
        newItems = newItems.filter(post => post.id !== postId)
        setDelitem(newItems)
    }

    const likeSubmit = (post) => {      //gestion des likes
        console.log(post)
        console.log(post.usersLiked)

        console.log(post)
        axios.post("http://localhost:4200/api/posts/"+post._id+"/like", post, {     //requête d'obtetion des likes
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${mytoken}` }
        })
        .then((res) => {
            console.log(res.data)
            setLike(post)
        })
        .catch(error => {
            console.log(error)
        }) 
    }
//page de fil d'actualité avec présentation des articles antéchronologique
    if (items === undefined) {
        return (
            userId ?
            <div className="container">
                <div className="mt-5 p-5">Chargement...</div>
            </div>
            : <div><img src={e404} className="pt-5 w-100 img-fluid" alt="error"></img></div>        //page d'erreur 404

        )
    } else {
        return (
            <div className="container p-0 m-0"> 
                <Profil props={props} />
                <div className="row justify-content-center m-0">
                    { items &&
                    items.map( post => (
                        
                    <div key={post._id} className="col-8 pb-5 mb-5">
                        <div className="mt-3 p-2 rounded" style={{backgroundColor: "#FFD7D7"}}>
                            <div className="rounded bg-light p-0 m-3 shadow"> 
                                <h5 className="mb-0 p-2" style={{color:"black"}}>{post.title} </h5>
                                <p className="mb-0 p-2 pb-3 border-bottom">{post.content}.</p>
                                {post.imageUrl !== null  && (<img className="d-block mx-auto mw-100" src={post.imageUrl} alt="Illustration de l'article"></img>)}
                                <p className="bg-light m-0 p-1">
                                    posté par {post.firstname} {post.lastname} le {post.createdAt.split("-")[2].split("T")[0].split(".")[0]}/{post.createdAt.split("-")[1].split("T")[0].split(".")[0]}/{post.createdAt.split("-")[0].split("T")[0].split(".")[0]} à {post.createdAt.split("T")[1].split(".")[0]} (UTC) 
                                </p>
                                {
                                (userId === post.userId || role === "ADMIN") && (<Deletepost postId={post._id} props={props} deleteItem={deleteItem}/>)
                                }
                                {
                                (userId === post.userId || role === "ADMIN") && ( 
                                <div className="bg-light p-3 rounded-bottom">
                                    <button onClick={() =>{ localStorage.setItem("postId", post._id); localStorage.setItem("title", post.title); localStorage.setItem("content", post.content) ; navigate("/modifypost")}} type="submit" className="shadow-lg btn btn-dark">Modifier l'article</button>
                                </div>)
                                }
                        <button className="bg-light m-3 mt-0 rounded-pill" onClick={() => likeSubmit(post)}>
                            <Badge  pill variant="danger">
                                {post.usersLiked.find(element => element === userId) ? <span className="fa-solid fa-thumbs-up"></span> : <span className="fa-regular fa-thumbs-up"></span>} J'aime: {post.likes}
                            </Badge>
                        </button>
                            </div>
                        </div>
                        
                    </div>
                    )).reverse()
                    }               
                </div>
            </div>
        )
        }    
}

export default Welcome