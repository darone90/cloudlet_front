import React from 'react';

import './Form.scss'

interface Props {
    values: {
        type: string,
        change: string,
        confirm: string,
        password: string,
    };
    func: (event: any) => void;
    color: string;
    information: string
}

const Form = (props: Props) => {

    const { values, func, color, information } = props;

    return (
        <div className='universal-form'>
            <form className="universal-form__form">
                <h4>Podaj nowe dane</h4>
                <label>
                    Nowy {values.type}:
                    <input type={values.type === 'login' ? 'text' : values.type} value={values.change} name='change' onChange={func} />
                </label>
                <label>
                    Potwierdź {values.type}:
                    <input type={values.type === 'login' ? 'text' : values.type} value={values.confirm} name='confirm' onChange={func} />
                </label>
                <label>
                    Hasło:
                    <input type="password" value={values.password} name='password' onChange={func} />
                </label>
            </form>
            <div className="universal-form__info" style={{ color: color }}>
                {information}
            </div>
        </div>
    )
}

export default Form;
