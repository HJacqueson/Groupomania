import React from "react";

// Static Images
import logo from "../../assets/logo.png";

const Home = () => {
    return (
        <div className="container">
            <h3 className="text-center fw-bold mt-5 pt-5">Bienvenue</h3>
            <div className="row gy-4 align-items-center">
                <div className="col-6 col-md-12">
                    
                    <p className="text-center fw-light">sur le réseau social de Groupomania !</p>
                    <img src={logo} className="w-100" alt="Logo de Groupomania, entreprise de grande distribution européenne" />
                </div>
            </div>   
        </div>
    );
};

export default Home;