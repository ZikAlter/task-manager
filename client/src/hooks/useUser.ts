import {useState, useEffect} from 'react';
import {IUser} from '../types/user.interface';

export const useUser = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        //console.log('Данные пользователя из localStorage:', storedUser);
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                //console.log('Распарсенные данные пользователя:', parsedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        }
    }, []);

    return {user};
}; 