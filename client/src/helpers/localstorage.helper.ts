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