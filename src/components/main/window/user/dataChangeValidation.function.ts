import { Dispatch, SetStateAction } from "react";
import { UserChange } from "../../../../types/login.types";

export const dataValidation = (color: Dispatch<SetStateAction<string>>, info: Dispatch<SetStateAction<string>>, changeData: UserChange): boolean => {

    if (!changeData.type || !changeData.change || !changeData.confirm || !changeData.password) {
        info('nie wszytskie wymagane pola zostały uzupełnione');
        color('red')
        return false
    }
    if (changeData.type === 'email' && (changeData.change.length > 60 || changeData.change.length < 5)) {
        info('adres mail nie może przekraczać 60 znaków i być mniejszy niż 5');
        color('red')
        return false
    }
    if (changeData.type === 'login' && (changeData.change.length > 40 || changeData.change.length < 3)) {
        info('login nie może przekraczać 40 znaków i być mniejszy niż 3');
        color('red')
        return false
    }
    if (changeData.type === 'hasło' && (changeData.change.length > 30 || changeData.change.length < 8)) {
        info('hasło nie może przekraczać 30 znaków i być mniejsz niż 8');
        color('red')
        return false
    }
    if (changeData.change !== changeData.confirm) {
        info('potwierdzenie mie zgadza się z podaną wartością');
        color('red')
        return false
    }

    return true
}