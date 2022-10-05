function Footer(){
    return (
        <div className="container mt-4">
            <div className="row navbar-light bg-light fixed-bottom">
                <div className="col-md-8">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavFooter" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavFooter">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="https://openclassrooms.com/fr/" rel="noreferrer" target = "_blank">OpenClassroom</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://www.id-interactive.fr/mentions-legales-site-internet/" rel="noreferrer" target = "_blank">Informations légales </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                    Copyright © 2022, All Right Reserved Hervé Jacqueson
                </div>   
            </div>
        </div>
        
    )
}

export default Footer