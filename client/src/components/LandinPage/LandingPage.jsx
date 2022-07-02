import React from "react";
import { Link } from "react-router-dom";
import landing from "./LandingPage.module.css";

export default function LandingPage () {
    return (
        <div>
            <div className = {landing.backGround}>                
                    <h1 className = {landing.welcome}>
                        <ul className = {landing.ul}> WELCOME TO THE</ul>
                        <ul className = {landing.ul}>FOOD APP</ul>
                        <br />
                    </h1>                    
                    <Link to = "/home">
                        <button className= {landing.boton}>Enter Home</button>
                    </Link>
            </div>
            <div className = {landing.footer}>
                App create by Gutierrez Micaias
            </div>
        </div>        
    );
};