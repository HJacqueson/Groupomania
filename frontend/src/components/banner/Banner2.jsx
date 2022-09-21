import {Link} from 'react-router-dom';

function Banner() {
    return(
        <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" className="collapse navbar-collapse justify-content-end">
                    <ul  className=" navbar-nav">
                        <li className="nav-item active">
                            <Link className='nav-link' to='/'>Accueil</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className='nav-link' to='/signup'>S'Inscrire</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Banner;