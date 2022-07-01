import React from 'react';
import { ButtonSize } from '../../../types/components.type';
import './Button.scss'

interface Props {
    func?: (param?: any) => void;
    text: string;
    size: ButtonSize
}

const Button = (props: Props) => {

    const { text, func, size } = props;

    return (
        <button onClick={func} className={`main ${size}`}>
            {text}
        </button>
    )
}

export default Button
