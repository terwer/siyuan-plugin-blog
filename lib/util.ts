/**
 * 是否在浏览器
 */
export function inBrowser() {
    return typeof window !== 'undefined';
}

/**
 * 获取url参数
 * @param sParam 参数
 */
export function getQueryString(sParam: string) {
    if (!inBrowser()) {
        return ""
    }
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');

    for (let i = 0; i < sURLVariables.length; i++) {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

/**
 * 设置url参数
 * @param urlstring
 * @param key
 * @param value
 */
export function setUrlParameter(urlstring: string, key: string, value: string) {
    if (!inBrowser()) {
        return ""
    }
    // 已经有参数了，不重复添加
    if (urlstring.indexOf(key) > -1) {
        return urlstring
    }
    urlstring += (urlstring.match(/[?]/g) ? '&' : '?') + key + '=' + value;
    return urlstring
}

export function isEmptyObject(obj: any) {
    if (!obj) {
        return true;
    }
    return (
        Object.getPrototypeOf(obj) === Object.prototype &&
        Object.getOwnPropertyNames(obj).length === 0 &&
        Object.getOwnPropertySymbols(obj).length === 0
    );
}

export function isEmptyString(str: any) {
    if (!str) {
        return true;
    }
    if (!(typeof str === 'string')) {
        return true
    }
    return str.trim().length == 0
}