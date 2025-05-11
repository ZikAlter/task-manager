export function getTokenFromLocalStorage(): string {
    const token = localStorage.getItem('token');
    return token ?? ''; // возвращаем строку или пустую строку, если токен не найден
}

export function setTokenToLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, token); // сохраняем токен как строку (без JSON.stringify)
}

export function removeTokenFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}


/* До изменений

export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('token')
    const token: string = data ? JSON.parse(data) : ''

    return token
}

export function setTokenToLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void {
    localStorage.removeItem(key)
}*/