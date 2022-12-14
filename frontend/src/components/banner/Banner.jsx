import {Link} from "react-router-dom"       //import de l'élément link
//bannière de header
function Banner() {
    return(
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark shadow fs-5 fw-bold">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" className="collapse navbar-collapse justify-content-end">
                    <ul  className=" navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/welcome">Fil d'Actualité</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/logout">Se déconnecter</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Banner