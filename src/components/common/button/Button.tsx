import React from 'react';
import { ButtonSize } from '../../../types/components.type';
import './Button.scss'

interface Props {
    func?: (param?: any) => void;
    text: string;
    size: ButtonSize
    exClass?: string
}

const Button = (props: Props) => {

    const { text, func, size, exClass } = props;

    return (
        <button onClick={func} className={`main ${size} ${exClass}`}>
            {text}
        </button>
    )
}

export default Button
