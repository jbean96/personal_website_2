import Cookies from "js-cookie";

export const WRAP_LONG_LINES_COOKIE_KEY = "wrapLongLines";

export const setWrapLongLinesCookie = (wrapLongLines: boolean) => {
    Cookies.set(WRAP_LONG_LINES_COOKIE_KEY, "" + wrapLongLines);
};