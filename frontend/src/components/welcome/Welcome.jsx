import axios from 'axios';
import {useState, useEffect} from 'react'
import Comment from '../comment/Comment'
import Profil from '../profile/Profile'


function Welcome(props) {
    const [item, setItem] = useState()
    let mytoken = localStorage.getItem('token')
 
    useEffect(() => {
        axios.get('http://localhost:4200/api/posts', {
            headers:{
                'Authorization': `Bearer ${mytoken}`
            }
        })
        .then(res => {
            console.log(res.status)
            setItem(res.data)
        })
        .catch(error => console.log(error))
    },[])
  
    if (item === undefined) {
        return (
            <div className="container">
                <div className='mt-5'>Chargement...</div>
            </div>
        )
    } else {
        return (
            <div className="container"> 
                <Profil props={props} />
                <div className="row">
                    { item &&
                    item.map( post => (
                        
                    <div key={post.id}>
                        <div className="card mt-3" >
                            <div className="card-body"> 
                                <h5 className="card-title" style={{color:"black"}}>{post.title} </h5>
                                <p className="card-text">{post.content}.</p>
                                <img className="card-img-top" src={post.imageUrl} alt="Card cap"></img>
                                {/* <p>posté par {post.firstname} {post.lastname}</p> */}
                                <Comment postId={post._id} props={props} />
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