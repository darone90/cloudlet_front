import React, { useState, MouseEvent } from 'react';
import { getconnection } from '../../../global/login-functions';
import { Link } from 'react-router-dom';
import { ButtonSize } from '../../../types/components.type';

import Spinner from '../../../components/common/spinner/Spinner';
import Button from '../../../components/common/button/Button';

import './Resend.scss'

const Resend = () => {

    const [login, setLogin] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<string>('');
    const [color, setColor] = useState<string>('black');

    const resendLink = async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setLoading(true)
        const data = await getconnection(login, 'users/resend')
        setLoading(false)
        setLogin('')
        if (data.status !== true) {
            setInfo(data.info);
            setColor('red')
        } else {
            setInfo(data.info);
            setColor('green')
        }

    }

    if (loading) return <Spinner />;

    return (
        <div className='Resend'>
            <h3>Ponowne wysłanie linku aktywacyjnego:</h3>
            <form>
                <label>
                    Login: <input type="text" onChange={(e) => setLogin(e.target.value)} value={login} />
                </label>
                <Button text='Wyślij nowy link' size={ButtonSize.Small} func={resendLink} />
            </form>
            <div style={{ color }} className='Resend__info'>
                {info}
            </div>
            <button><Link to={'/'} >Powrót do logowania</Link></button>
        </div>
    )
}

export default Resend