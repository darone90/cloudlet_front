import React from 'react';

interface Props {
    values: {
        type: string,
        change: string,
        confirm: string,
        password: string,
    }
    func: (event: any) => void
}

const Form = (props: Props) => {

    const { values, func } = props;

    return (
        <div className='universal-form'>
            <form className="universal-form__form">
                <h1>Podaj nowe dane</h1>
                <label>
                    Nowy {values.type}:
                    <input type={values.type} value={values.change} name='change' onChange={func} />
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
        </div>
    )
}

export default Form;
