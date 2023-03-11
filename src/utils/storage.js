/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function getItem(key) {
    try {
        var name = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
            c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
            }
        }
        return null;
    } catch(er)  {
        console.error(er);
        return null;
    }
}

/**
   * Saves an object to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
export function setItem(key, value, remove) {
    try {
        var d = new Date();
        d.setDate(d.getDate() + 1);
        d.setHours(3);
        d.setMinutes(0);
        d.setSeconds(0);
        var expires = "expires=" + d.toGMTString();
        if (remove) {
        document.cookie =
            key + "=" + value + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
        }
        return true;
    } catch(er) {
        console.error(er);
        return false;
    }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function removeItem(key) {
    try {
        setItem(key, "", true);
        return true;
    } catch (er) {
        console.error(er);
        return false;
    }
}

export function clearAll() {
    try {
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c) {
            var name = ca[i].split("=")[0].trim();
            setItem(name, "", true);
        }
        }
        return true;
    } catch {
        return false;
    }
}