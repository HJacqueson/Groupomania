import axios from "axios"

function Deletepost({postId, deleteItem}) {
    console.log(postId)
    let mytoken = localStorage.getItem("token")
    const delItem = () => {
        console.log(postId)
        axios.delete("http://localhost:4200/api/posts",{ 
            data:{id:postId},
            headers: {"Authorization": `Bearer ${mytoken}` }
        })
        .then(() => {
            deleteItem(postId)
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    return (
        <div>
            <button className="btn btn-danger mt-3" onClick={() => delItem()}>Supprimer l"article</button>
        </div>
    )
}

export default Deletepost