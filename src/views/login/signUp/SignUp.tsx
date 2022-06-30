import React from "react";
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div>
            Dodaj użytkownika
            <button><Link to={'/'} >Powrót do logowania </Link></button>
        </div>
    )
}

export default SignUp