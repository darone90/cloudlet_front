import React, { ChangeEvent, useState, MouseEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../../types/login.types';
import { newUserValidationFunc } from "./validation.function";
import { connection } from "../../../global/login-functions";
import { ButtonSize } from "../../../types/components.type";
import './SignUp.scss';

import Spinner from "../../../components/common/spinner/Spinner";
import Button from "../../../components/common/button/Button";

const initialState = {
    email: '',
    login: '',
    password: '',
    confirm: '',
}

const SignUp = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)

    const [information, setInformation] = useState<string>('Proszę uzupełnić dane');
    const [color, setColor] = useState<string>('black');
    const [userData, setUserData] = useState<User>(initialState);

    const userRegistrationHandler = async (e: MouseEvent<HTMLElement>) => {

        e.preventDefault()
        if (!newUserValidationFunc(setColor, setInformation, userData)) return;

        setLoading(true);
        const response = await connection(userData, 'users/add', 'POST')
        setLoading(false);

        if (response.status !== true) {
            navigate(`/error/:${response.info}`)
        } else {
            setColor('green');
            setInformation('Dane zostały prawidłowo zapisane. W celu aktywacji konta sprawdź swoją skrzynkę i kliknij w link weryfikacyjny');
            setUserData(initialState)
        }
    }

    const addUserData = (event: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    if (loading) return <Spinner />;

    return (
        <div className="signup">
            <h1>Dane nowego użytkownika</h1>
            <form className="signup__form">

                <label>
                    Email:
                    <input type="email" value={userData.email} name='email' onChange={addUserData} />
                </label>
                <label>
                    Login:
                    <input type="text" value={userData.login} name='login' onChange={addUserData} />
                </label>
                <label>
                    Hasło:
                    <input type="password" value={userData.password} name='password' onChange={addUserData} />
                </label>
                <label>
                    Potwierdź hasło:
                    <input type="password" value={userData.confirm} name='confirm' onChange={addUserData} />
                </label>
                <Button text="Zapisz" size={ButtonSize.Small} func={userRegistrationHandler} />
            </form>
            <div className="signup__information" style={{ color: color }}>
                {information}
            </div>
            <button className="signup__return"><Link to={'/'} >Powrót do logowania </Link></button>
        </div>
    )
}

export default SignUp