export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };
  
  export const isUserLoggedIn = (): boolean => {
    return !!getCookie('sessionToken');
  };
  
  export const getUserLevel = (): number => {
    const level = getCookie('userLevel');
    return level ? parseInt(level, 10) : 0;
  };

  export const setCookie = (name: string, value: string, days: number = 7): void => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));  // Tiempo de expiración
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;  // Setea la cookie
  };