import axios from "axios";


function Delcomment({commentId , deleteComment}){
    console.log(commentId)
    let mytoken = localStorage.getItem("token");
    const delComment = () => {
        axios.delete("http://localhost:4200/api/comments",{
            data: {id:commentId}, 
            headers: {"Authorization": `Bearer ${mytoken}` } 
        })
            .then(() =>  {
                deleteComment(commentId)
            })
            .catch(error => {
                console.log(error)
            })
        }

    return (
        <div>
            <button type="button" onClick={() => delComment()} className="btn btn-link btn-sm">Supprimer</button>
        </div>
    )
}

export default Delcomment