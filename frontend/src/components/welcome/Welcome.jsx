import axios from "axios";
import {useState, useEffect} from "react"
import Profil from "../profile/Profile"
import Deletepost from "../post/Deletepost"
import Badge from 'react-bootstrap/Badge'


function Welcome(props) {
    const [items, setItems] = useState()
    const [delItem, setDelitem] = useState(0)
    const [like, setLike] = useState()
    let mytoken = localStorage.getItem("token")
    let userId = localStorage.getItem("userId")
    console.log(userId)
    let role = localStorage.getItem("role")
    
 
    useEffect(() => {
        axios.get("http://localhost:4200/api/posts", {
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
  
    const deleteItem = postId => {
        let newItems = [...items]
        newItems = newItems.filter(post => post.id !== postId)
        setDelitem(newItems)
    }


    const likeSubmit = (post) => {
        console.log(post)
        console.log(post.usersLiked)

        console.log(post)
        axios.post("http://localhost:4200/api/posts/"+post._id+"/like", post, {
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

    if (items === undefined) {
        return (
            <div className="container">
                <div className="mt-5 p-5">Chargement...</div>
            </div>
        )
    } else {
        return (
            <div className="container p-0 m-0"> 
                <Profil props={props} />
                <div className="row justify-content-center">
                    { items &&
                    items.map( post => (
                        
                    <div key={post.id} className="col-8 pb-5 mb-5">
                        <div className="mt-3 p-2 rounded" style={{backgroundColor: "#FFD7D7"}}>
                            <div className="card-body rounded bg-light p-0 m-3 shadow"> 
                                <h5 className="card-title mb-0 p-2" style={{color:"black"}}>{post.title} </h5>
                                <p className="card-text mb-0 p-2">{post.content}.</p>
                                {post.imageUrl !== undefined && (<img className="card-img-top d-block mx-auto mw-100" src={post.imageUrl} alt="Card cap"></img>)}
                                <p className="bg-light m-0 p-1">posté par {post.firstname} {post.lastname} le {post.createdAt.split("T")[0].split(".")[0]} à {post.createdAt.split("T")[1].split(".")[0]}</p>
                                {
                                (userId === post.userId || role === "ADMIN") && (<Deletepost  postId={post._id} props={props} deleteItem={deleteItem}/>)
                                }
                        <button className="bg-light m-3 mt-0 rounded-pill" onClick={() => likeSubmit(post)}>
                            <Badge  pill variant="danger">
                                J'aime : {post.likes}
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