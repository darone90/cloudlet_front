import { Dispatch, SetStateAction } from "react";
import { User } from "../../../types/login.types";

export const newUserValidationFunc = (color: Dispatch<SetStateAction<string>>, info: Dispatch<SetStateAction<string>>, userData: User): boolean => {
    if (userData.password !== userData.confirm) {
        color('red');
        info('Potwierdzenie hasła różni się od hasła');
        return false
    }
    if (userData.password.length < 8) {
        color('red');
        info('Hasło musi składać się z conajmniej 8 znaków');
        return false
    }
    if (userData.email.length < 5 || userData.login.length < 3) {
        color('red');
        info('Podane dane są za krótkie email: min 5 znaków, login: min 3 znaki');
        return false
    }
    if (!userData.email || !userData.login || !userData.password) {
        color('red');
        info('Pozostały nieuzupełnione wymagane pola! (email, login, hasło)');
        return false
    }
    if (userData.email.length > 60 || userData.login.length > 40 || userData.password.length > 30) {
        color('red');
        info('Podane dane są za długie! Email max: 60 znaków, login max: 40 znaków, hasło max: 30 znaków');
        return false
    }

    return true
}