import axios from "axios"       //import du client HTTP axios

function Deletepost({postId, deleteItem}) {
    let mytoken = localStorage.getItem("token")     //récupération du token dans le local storage
    
    const delItem = () => {
        axios.delete("http://localhost:4200/api/posts/"+postId,{        //requête de récupération d'un post
            headers: {"Authorization": `Bearer ${mytoken}` }
        })
        .then(() => {
            deleteItem(postId)      //suppression du post
        })
        .catch(error => {
            console.log(error)
        }) 
    }
//composant bouton de suppression de post
    return (
        <div className="bg-light p-3 rounded-bottom">
            <button className="shadow btn btn-dark" onClick={() => delItem()}>Supprimer l'article</button>
        </div>
    )
}

export default Deletepost