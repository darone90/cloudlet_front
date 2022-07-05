import React, { ChangeEvent, useState, MouseEvent } from "react";
import { Link } from 'react-router-dom';
import { User } from '../../../types/login.types';
import { connection } from "../../../global/login-functions";
import { ButtonSize } from "../../../types/components.type";
import './SignUp.scss';

import Spinner from "../../../components/common/spinner/Spinner";
import Button from "../../../components/common/button/Button";

const SignUp = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const [information, setInformation] = useState<string>('Proszę uzupełnić dane');
    const [color, setColor] = useState<string>('black');
    const [userData, setUserData] = useState<User>({
        email: '',
        login: '',
        password: '',
        confirm: '',
    });

    const userRegistrationHandler = async (e: MouseEvent<HTMLElement>) => {

        e.preventDefault()
        if (userData.password !== userData.confirm) {
            setColor('red');
            setInformation('Potwierdzenie hasła różni się od hasła');
            return
        }
        if (userData.password.length < 8) {
            setColor('red');
            setInformation('Hasło musi składać się z conajmniej 8 znaków');
            return
        }
        if (!userData.email || !userData.login || !userData.password) {
            setColor('red');
            setInformation('Pozostały nieuzupełnione pola!');
            return
        }
        if (userData.email.length > 60 || userData.login.length > 40 || userData.password.length > 30) {
            setColor('red');
            setInformation('Podane dane są za długie! Email max: 60 znaków, login max: 40 znaków, hasło max: 30 znaków');
            return
        }

        setLoading(true);
        const responese = await connection(userData, 'users/add', 'POST')
        setLoading(false);
        console.log(responese.status)
        if (!responese.status) {
            window.location.href = `/error/:${responese.info}`
        } else {
            setColor('green');
            setInformation('Dane zostały prawidłowo zapisane. W celu aktywacji konta sprawdź swoją skrzynkę i kliknij w link weryfikacyjny');
            setUserData({
                email: '',
                login: '',
                password: '',
                confirm: '',
            })
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
            <form className="signup__form">
                <h1>Dane nowego użytkownika</h1>
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