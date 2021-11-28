import Cookies from "js-cookie";

export const DARK_MODE_COOKIE_KEY = "darkMode";

export const setDarkModeCookie = (isDarkMode: boolean) => {
    Cookies.set(DARK_MODE_COOKIE_KEY, "" + isDarkMode);
};

export const getDarkModeCookie = (): boolean => {
    const cookieValue = Cookies.get(DARK_MODE_COOKIE_KEY);
    return cookieValue === "true";
};