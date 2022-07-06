import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getconnection } from '../../../global/login-functions';
import { ButtonSize } from '../../../types/components.type';

import Spinner from '../../../components/common/spinner/Spinner';
import Button from '../../../components/common/button/Button';

import './Reset.scss';

const Reset = () => {

    const [login, setLogin] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<string>('');

    const sendLogin = async () => {
        setLoading(true);
        const response = await getconnection(login, 'users/check');
        setLoading(false);
        if (response.status === true) {
            setInfo(response.info);
            setLogin('');
        } else {
            setInfo(response.info);
            setLogin('');
        }
    }

    if (loading) return <Spinner />;

    return (
        <div className='Reset'>
            <form>
                <label>
                    Wprowadź login: <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                </label>
                <Button text='Wyślij link resetujący' size={ButtonSize.Big} func={sendLogin} />
                <div>
                    {info}
                </div>
            </form>
            <button className="signup__return"><Link to={'/'} >Powrót do logowania</Link></button>
        </div>
    )
}

export default Reset