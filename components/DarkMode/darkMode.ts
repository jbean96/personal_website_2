import Cookies from "js-cookie";

export const DARK_MODE_COOKIE_KEY = "darkMode";

export const setDarkModeCookie = (isDarkMode: boolean) => {
    Cookies.set(DARK_MODE_COOKIE_KEY, "" + isDarkMode);
};