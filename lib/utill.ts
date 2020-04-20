import request from "request";

export function toTitleCase(str:string) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
//url to check if a server is active
export function checkServerStatusURL(url) {
    return `https://helloacm.com/api/can-visit/?url=${url}`;
}