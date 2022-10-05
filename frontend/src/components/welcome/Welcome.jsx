import "./welcome.css"
import axios from "axios";
import {useState, useEffect} from "react"
import Profil from "../profile/Profile"
import Deletepost from "../post/Deletepost"


function Welcome(props) {
    const [items, setItems] = useState()
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
    },)
  
    const deleteItem = postId => {
        let newItems = [...items]
        newItems = newItems.filter(post => post.id !== postId)
        setItems(newItems)
    } 

    if (items === undefined) {
        return (
            <div className="container">
                <div className="mt-5">Chargement...</div>
            </div>
        )
    } else {
        return (
            <div className="container p-0 m-0"> 
                <Profil props={props} />
                <div className="row justify-content-center">
                    { items &&
                    items.map( post => (
                        
                    <div key={post.id} className="col-8 pb-5">
                        <div className="card mt-3" >
                            <div className="card-body"> 
                                <h5 className="card-title bg-light mb-0 p-2 border border-bottom-0 border-danger" style={{color:"black"}}>{post.title} </h5>
                                <p className="card-text bg-light p-2 border border-top-0 border-danger">{post.content}.</p>
                                {post.imageUrl !== undefined && (<img className="card-img-top d-block mx-auto pb-5" src={post.imageUrl} alt="Card cap"></img>)}
                                <p>posté par {post.firstname} {post.lastname} le {post.createdAt.split("T")[0].split(".")[0]} à {post.createdAt.split("T")[1].split(".")[0]}</p>
                                {
                                (userId === post.userId || role === "ADMIN") && (<Deletepost  postId={post._id} deleteItem={deleteItem} />)
                                }
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