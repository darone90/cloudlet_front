import { Dispatch, SetStateAction } from "react";
import { Password } from "./NewPassword";

export const dataValidation = (color: Dispatch<SetStateAction<string>>, info: Dispatch<SetStateAction<string>>, password: Password): boolean => {

    if (password.password.length > 30) {
        color('red');
        info('Hasło musi mieć mniej niż 30 znaków');
        return false
    }

    if (password.password.length < 8) {
        color('red');
        info('Hasło musi mieć więcej niż 7 znaków');
        return false
    }

    if (password.password !== password.confirm) {
        color('red');
        info('Potwierdzenie hasła różni się od hasła');
        return false
    }

    return true;
}